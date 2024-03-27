const Products = require('../models/product');



//Get all Products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Products.find(); // Query all products from the database
    
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Add New Product
exports.newProducts = async (req, res, next) => {
    try {
        const product = await Products.create(req.body);
    
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error(error);
        // Check for specific errors (e.g., validation errors)
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        // Handle other types of errors
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


// Get single product details 
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// Update Product by their ID
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// Delete Product by their ID
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            product
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}