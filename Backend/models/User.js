const db = require('../config/database');

const User = {
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
  },
  
  findById: (id, callback) => {
    const query = 'SELECT id, username, role FROM users WHERE id = ?';
    db.query(query, [id], callback);
  },
  
  create: (userData, callback) => {
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [userData.username, userData.password, userData.role || 'user'], callback);
  }
};

module.exports = User;