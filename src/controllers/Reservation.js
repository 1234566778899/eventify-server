const Reservation = require('../db/Schemas/Reservation');
const User = require('../db/Schemas/User');

// Registrar una nueva reservación
const registerReservation = async (req, res) => {
    try {
        const { space, dates, email, own } = req.body;
        const userRef = await User.findOne({ email });
        if (!userRef) {
            return res.status(401).send({ error: 'Usuario no encontrado' });
        }
        const newReservation = await Reservation.create({
            space,
            dates,
            user: userRef._id,
            own
        });

        return res.status(200).json({ message: 'Reservación registrada con éxito', reservation: newReservation });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getReservationsByOwn = async (req, res) => {
    try {
        const { email } = req.params;
        const reservations = await Reservation.find({ own: email }).populate('user space');
        return res.status(200).json(reservations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getReservationsByUser = async (req, res) => {
    try {
        const { user } = req.params;
        const reservations = await Reservation.find({ user }).populate('space');
        return res.status(200).json(reservations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findOne({ _id: id }).populate('user space');
        return res.status(200).json(reservation);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    registerReservation,
    getReservationsByOwn,
    getReservation,
    getReservationsByUser
};
