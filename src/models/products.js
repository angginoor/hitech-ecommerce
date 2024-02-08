const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    availability: [{
        color: String,
        storage: String,
        available: Boolean
    }],
    category: String,
    image: String
})

const Product = models?.Product || model("Product", ProductSchema)
export default Product