import { connectMongoDB } from "@/lib/mongoose";
import Product from "@/models/products";
import { NextResponse } from "next/server";

export async function findAllProducts() {
  return Product.find().exec()
}

export const GET = async (req, res) => {
  try {
    await connectMongoDB();
    const {searchParams} = req.nextUrl
    const query = searchParams.get('query')
    console.log('hello')

    if(query) {
      const products = await Product.find({ _id: query }).exec();
      return NextResponse.json(products);
    } else {
      const products = await findAllProducts()
      return NextResponse.json(products)
    }

    // const products = await findAllProducts()
    // return NextResponse.json(products)
    
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error('Failed to catch data!')
  }
}
