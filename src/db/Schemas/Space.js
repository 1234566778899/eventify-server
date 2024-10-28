const { Schema, model } = require('mongoose');

const SpaceSchema = Schema({
    name: String,
    lname: String,
    address: String,
    capacity: Number,
    price: Number,
    type: String,
    description: String,
    imgs: [String],
    user: String,
    stars: Number
}, {
    timestamps: true
})

module.exports = model('space', SpaceSchema)