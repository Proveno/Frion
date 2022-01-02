const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    key:{
        type: String,
        required: [true, 'Please enter key'],
        trim: true,
        unique: true
    }
})

module.exports = mongoose.models.Key || mongoose.model('Key', KeySchema);