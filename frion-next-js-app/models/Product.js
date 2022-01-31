const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please add title'],
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Please add description'],
        trim: true
    },
    price:{
        type: mongoose.Decimal128,
        required: true,
        min: [0.0, 'Price must be > 0']
    },
    category:{
        type: String,
        required: true
    },
    photo:{
        type: String ,
        required: true
    },
    productLocale:{
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);