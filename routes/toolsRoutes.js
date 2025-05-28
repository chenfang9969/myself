const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/toolsController');

router.get('/', toolsController.getAllTools);
router.post('/', toolsController.addTool);
router.delete('/:id', toolsController.deleteTool);

module.exports = router;
