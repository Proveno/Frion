const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: [true, 'Please enter category'],
        trim: true
    },
    categoryLocale:{
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);