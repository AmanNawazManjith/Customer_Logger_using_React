const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    jNum: {
        type: Number,
        required: true
    },
    cName:{
        type: String,
        require: true
    },
    cNum: {
        type: Number,
        required: true
    },
    itemDetail: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    workDone: {
        type: String,
        required: true,
    },
    workStat: {
        type: String,
        required: true,
    },
    charges: {
        type: String,
        required: true,
    },
    delDate: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

const Exercise = mongoose.model('customer', exerciseSchema);

module.exports = Exercise;