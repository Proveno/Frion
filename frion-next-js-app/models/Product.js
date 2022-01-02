const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please add title'],
        trim: true,
        maxlength: [60, 'Title cannot be more than 60 characters']
    },
    description:{
        type: String,
        required: [true, 'Please add description'],
        trim: true,
        maxlength: [400, 'Description can not be more than 400 characters']
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
    }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);