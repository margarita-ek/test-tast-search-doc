const {Schema, model} = require("mongoose");

const Document = new Schema({
    _id: {
        type: Number,
        required: true        
    },
    date: {
        type: Date,
        default: Date.now
    }, 
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

module.exports = model("documents", Document)