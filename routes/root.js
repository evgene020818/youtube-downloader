const express = require('express');
const router = express.Router();
const formatsController = require('../controllers/formatsController');

router.route('/').post(formatsController.getAllFormats);

module.exports = router;