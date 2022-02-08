const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter name'],
        trim: true
    },
    surname:{
        type: String,
        required: [true, 'Please enter surname'],
        trim: true
    },
    phone:{
        type: String,
        required: [true, 'Please enter phone number'],
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        trim: true
    },
    products:{
        type: Array,
        required: [true, 'Please enter products']
    },
    productsQuant:{
        type: Array,
        required: [true, 'Please enter products quantity']
    },
    sum:{
        type: mongoose.Decimal128,
        required: true,
        min: [0.0, 'Sum must be > 0']
    },
    orderLocale:{
        type: String,
        required: true
    },
    accepted:{
        type: Boolean,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
    archivedAt:{
        type: String
    }
})

module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);