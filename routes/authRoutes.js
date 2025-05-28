const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/authController');

const favoriteRoutes = require('../routes/favoriteRoutes');

router.get('/profile',favoriteRoutes);
router.post('/register', register);
router.post('/login', login);
router.post('/changePassword',changePassword)


module.exports = router;
