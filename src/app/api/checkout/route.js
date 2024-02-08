import { connectMongoDB } from "@/lib/mongoose"
import Order from "@/models/order";
import Product from "@/models/products";
import { NextRequest, NextResponse } from "next/server"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req, res) => {
    try {
        await connectMongoDB();

        if (req.method !== 'POST') {
            res.body('only POST');
            return;
        }

        const {name,address,city,zipcode} = req.body;
        const productsIds = req.body.products
        const uniqueIds = [...new Set(productsIds)];
        const products = await Product.find({_id:{$in:uniqueIds}}).exec();

        let line_items = []
        for (let productId of uniqueIds) {
            const qty = productsIds.filter(id => id === productId).length
            const product = products.find(p => p._id.toString() === productId)
            line_items.push({
                qty,
                price_data: {
                    currency: 'USD',
                    product_data: {name: product.name},
                    unit_amount: product.price * 100
                }
            })
        }

        const order = await Order.create({
            name,
            address,
            city,
            zipcode,
            products:line_items,
            paid:0,
        });

        const session = await stripe.checkout.session.create({
            line_items: line_items,
            mode: 'payment',
            customer_email: email,
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
            metadata: {orderId:order._id.toString()}
        })

        return NextResponse.redirect(303, session.url)
        
    } catch (error) {
        console.error(error);
        throw new Error('Failed to catch data!')
    }
    
}