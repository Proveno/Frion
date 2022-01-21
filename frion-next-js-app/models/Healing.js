const mongoose = require('mongoose');

const HealingSchema = new mongoose.Schema({
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
    category:{
        type: String,
        required: true
    },
    requestLocale:{
        type: String,
        required: true
    },
    accepted:{
        type: Boolean,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    archivedAt:{
        type: Date
    }
    
})

module.exports = mongoose.models.Healing || mongoose.model('Healing', HealingSchema);