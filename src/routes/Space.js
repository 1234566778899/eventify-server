const express = require('express');
const { register, getSpaces, getAllSpaces, getSpace } = require('../controllers/Space');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.post('/', upload.array('files'), register);
router.get('/:email', getSpaces);
router.post('/retrieve', getAllSpaces);
router.get('/retrieve/:id', getSpace);

module.exports = router;