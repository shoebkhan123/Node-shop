const mongoose = require('mongoose');

/* Schema for product product */
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    }
}, 
{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;