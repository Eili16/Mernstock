const Products = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsycnError');


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
exports.newProducts = catchAsyncError (async (req, res, next) => {
    
        const product = await Products.create(req.body);
    
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
})


// Get single product details 
exports.getSingleProduct =  catchAsyncError (async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            throw new ErrorHandler('Product not found', 404);
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware (error handler)
    }
});

// Update Product by their ID
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            throw new ErrorHandler('Product not found', 404);
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
});


// Delete Product by their ID
exports.deleteProduct = catchAsyncError (async (req, res, next) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);

        if (!product) {
            throw new ErrorHandler('Product not found', 404);
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
});