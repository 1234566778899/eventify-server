const express = require('express');
const { register, getInfo, editInfo } = require('../controllers/User');
const router = express.Router();

router.post('/register', register);
router.get('/:email', getInfo);
router.put('/:email', editInfo);

module.exports = router;