const express = require('express');
const router = express.Router();
const { submitTool } = require('../controllers/submissionController');

router.post('/', submitTool);

module.exports = router;
