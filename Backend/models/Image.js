const db = require('../config/database');

const Image = {
  findAll: (callback) => {
    const query = `
      SELECT images.*, users.username 
      FROM images 
      LEFT JOIN users ON images.user_id = users.id 
      ORDER BY images.created_at DESC
    `;
    db.query(query, callback);
  },
  
  findByCategory: (category, callback) => {
    const query = `
      SELECT images.*, users.username 
      FROM images 
      LEFT JOIN users ON images.user_id = users.id 
      WHERE category = ? 
      ORDER BY images.created_at DESC
    `;
    db.query(query, [category], callback);
  },
  
  findById: (id, callback) => {
    const query = 'SELECT * FROM images WHERE id = ?';
    db.query(query, [id], callback);
  },
  
  create: (imageData, callback) => {
    const query = 'INSERT INTO images (title, description, category, image_url, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [
      imageData.title, 
      imageData.description, 
      imageData.category, 
      imageData.image_url, 
      imageData.user_id
    ], callback);
  },
  
  update: (id, imageData, callback) => {
    const query = 'UPDATE images SET title = ?, description = ?, category = ? WHERE id = ?';
    db.query(query, [
      imageData.title, 
      imageData.description, 
      imageData.category, 
      id
    ], callback);
  },
  
  delete: (id, callback) => {
    const query = 'DELETE FROM images WHERE id = ?';
    db.query(query, [id], callback);
  },
  
  incrementLikes: (id, callback) => {
    const query = 'UPDATE images SET likes = likes + 1 WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Image;