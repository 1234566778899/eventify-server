const express = require('express');
const { addSubscription } = require('../controllers/Subscription');
const router = express.Router();

router.post('/create_preference', addSubscription);

module.exports = router;


