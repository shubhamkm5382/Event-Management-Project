const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

router.get('/profile', authenticateToken, getProfile);

module.exports = router;