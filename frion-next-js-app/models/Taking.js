const mongoose = require('mongoose');

const TakingSchema = new mongoose.Schema({
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
    archivedAt:{
        type: Date
    }
    
})

module.exports = mongoose.models.Taking || mongoose.model('Taking', TakingSchema);