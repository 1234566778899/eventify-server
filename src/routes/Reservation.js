const express = require('express');
const { registerReservation, getReservationsByOwn, getReservation, getReservationsByUser } = require('../controllers/Reservation');
const router = express.Router();

router.post('/', registerReservation);
router.get('/:email', getReservationsByOwn);
router.get('/retrieve/:id', getReservation);
router.get('/retrieve/user/:user', getReservationsByUser);

module.exports = router;