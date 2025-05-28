const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { toggleFavorite, listFavorites } = require('../controllers/favoriteController');

router.use(authMiddleware);
router.get('/', listFavorites);
router.post('/toggle', toggleFavorite);

module.exports = router;
