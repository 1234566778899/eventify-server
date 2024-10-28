const { Schema, model } = require('mongoose');

const ReservationSchema = Schema({
    space: { type: Schema.Types.ObjectId, ref: 'space' },
    dates: [Date],
    own: String,
    user: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
})

module.exports = model('reservation', ReservationSchema)