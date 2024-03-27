const Product = require('../models/product');

// Create a new Product
exports.newProducts = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
    
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

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success:true,
        message: 'This route will show all products database.'
    })
}