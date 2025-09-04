const User = require('../models/User');

const getProfile = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role
  });
};

module.exports = { getProfile };