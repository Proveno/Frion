const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    key:{
        type: String,
        required: [true, 'Please enter key'],
        trim: true,
        unique: true
    },
    owner:{
        type: String,
        required: [true, 'Please enter owner'],
        trim: true,
    },
    addAndUpdateKeys:{
        type: Boolean,
        required: false
    },
    deleteKeys:{
        type: Boolean,
        required: false
    },
    addAndUpdateProducts:{
        type: Boolean,
        required: false
    },
    deleteProducts:{
        type: Boolean,
        required: false
    },
    takingReq:{
        type: Boolean,
        required: false
    },
    acceptedTakingReq:{
        type: Boolean,
        required: false
    },
    givingReq:{
        type: Boolean,
        required: false
    },
    acceptedGivingReq:{
        type: Boolean,
        required: false
    },
    healingReq:{
        type: Boolean,
        required: false
    },
    acceptedHealingReq:{
        type: Boolean,
        required: false
    },
    addPlaces:{
        type: Boolean,
        required: false
    },
    deletePlaces:{
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.models.Key || mongoose.model('Key', KeySchema);