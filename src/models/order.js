const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema ({
    name: String,
    address: String, 
    city: String,
    zipcode: Number,
    products: Object,
    paid: {
        type: Number,
        defaultValue: 0
    }
}, {timestamps: true})

const Order = models?.Order || model('Order', OrderSchema)
export default Order

