const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/product.controller');
const upload = require('../config/upload');

// Product routes
router.post('/all/create', upload.single('image'), createProduct);
router.get('/all', getAllProducts);
router.get('/all/:id', getProductById);
router.put('/all/:id', upload.single('image'), updateProduct);
router.delete('/all/:id', deleteProduct);

module.exports = router;
