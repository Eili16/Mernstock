const express = require('express');
const router = express.Router();


const { getProducts, newProducts, getSingleProduct, updateProduct,deleteProduct } = require('../controllers/productControllers')

// All Products
router.route('/products').get(getProducts);
// Add Products
router.route('/admin/product/new').post(newProducts);
// Single Product By Id
router.route('/product/:id').get(getSingleProduct);
// Update Single Product
router.route('/admin/product/:id').put(updateProduct);
// Delete Single Product
router.route('/admin/product/:id').delete(deleteProduct);






module.exports = router;