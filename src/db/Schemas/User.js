const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: String,
    lname: String,
    email: String,
    cellphone: String,
    active: { type: Boolean, default: false },
    subscribed: { type: Boolean, default: false }
}, {
    timestamps: true
})

module.exports = model('user', UserSchema)