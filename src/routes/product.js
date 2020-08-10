const express = require('express');
const multer = require('multer');

const route =  express.Router();

const Product = require('../models/product');

const BASE_URL = 'http://localhost:3000/';


/* file storage  by multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

/* Filtering upload image */
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype == 'image/png') {
        cb(null ,true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter
 })

/* add a product routes */
route.post('/product', upload.single('image'), async (req, res) => {
        const product = new Product({ title: req.body.title, description: req.body.description, price: req.body.price, productImage: req.file? req.file.path: null })
    try {
        await product.save();
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
});

/* Get all product routes */
route.get('/product', async (req, res) => {
    try {
        const products =  await Product.find().sort({ createdAt: -1 }).exec();
        const modifiedResponse = products.map(product => {
            return {
                _id: product._id,
                title: product.title,
                price: product.price,
                description: product.description,
                productImage: product.productImage? `${BASE_URL}${product.productImage}`: null
            }
        })
        res.send(modifiedResponse)
 
    } catch (error) {
        res.status(500).send(error)
    }
});

/* Get product by id routes */
route.get('/product/:id', async (req, res) => {
    try {
        const product =  await Product.findById(req.params.id);
        res.send({
            title: product.title,
            price: product.price,
            description: product.description,
            productImage: product.productImage? `${BASE_URL}${product.productImage}`: null
        })    
    } catch (error) {
        res.status(500).send(error)
    }
});

/* Delete product by id routes */
route.delete('/product/:id', async (req, res) => {
    try {
        const product =  await Product.findByIdAndDelete(req.params.id);
        res.send(product)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = route;