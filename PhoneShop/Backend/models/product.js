const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true,
        maxLength: [100,'Product name cannout exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please Enter Product price'],
        maxLength: [5,'Product name cannout exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            publid_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },

        }
    ],
    category: {
        type: String,
        required: [true, 'Please select Category for this product'],
        enum:{
            values: [
                'Smartphones',
                'Tablets',
                'Laptop and Computer',
                'Smartwatches and Fitness Tracker',
                'Audio Device',
                'Gaming Consoles and Accessories',
                'Camera'
            ],
            message: 'Please Select Correct Category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please Enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter product stock'],
        maxLength: [5, 'Please Enter product stock']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product',productSchema);