const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [40, 'Title can not be more than 40 characters']
    },
    name:{
        type: String,
        required: [true, 'Please add name'],
        unique: true,
        trim: true,
        maxlength: [40, 'Name can not be more than 40 characters']
    },
    description:{
        type: String,
        require: true,
        maxlength: [400, 'Description can not be more than 400 characters']
    },
    price:{
        type: Number,
        require: true,
        min: [0,'Price must be more than 0']
    }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);