const Product = require('../models/productSchema');

exports.createProduct = async (req, res) => {
    try {
        const { title, anime_name, price, description } = req.body;

        // Validate required fields
        if (!title || !anime_name || !price || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate price is a positive number
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a positive number'
            });
        }

        // Check if image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Product image is required'
            });
        }

        const product = new Product({
            title,
            anime_name,
            price: Number(price),
            description,
            image: req.file.filename
        });

        await product.save();
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { title, anime_name, price, description } = req.body;
        
        // Validate price if provided
        if (price && (isNaN(price) || price <= 0)) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a positive number'
            });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (anime_name) updateData.anime_name = anime_name;
        if (price) updateData.price = Number(price);
        if (description) updateData.description = description;
        if (req.file) updateData.image = req.file.filename;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete the product image from uploads folder
        const fs = require('fs');
        const path = require('path');
        const imagePath = path.join(__dirname, '..', 'uploads', product.image);
        
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};