const db = require('./config/database');
require('dotenv').config();

// Create tables if they don't exist
const initDatabase = () => {
  // Users table
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Images table
  const imagesTable = `
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100),
      image_url VARCHAR(500) NOT NULL,
      likes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `;

  db.query(usersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table ready');
      
      // Insert default admin user if not exists
      const bcrypt = require('bcryptjs');
      const hashedPassword = bcrypt.hashSync('password', 10);
      
      const insertAdmin = `
        INSERT IGNORE INTO users (username, password, role) 
        VALUES ('admin', ?, 'admin')
      `;
      
      db.query(insertAdmin, [hashedPassword], (err) => {
        if (err) {
          console.error('Error creating admin user:', err);
        } else {
          console.log('Admin user ready (username: admin, password: password)');
        }
      });
    }
  });

  db.query(imagesTable, (err) => {
    if (err) {
      console.error('Error creating images table:', err);
    } else {
      console.log('Images table ready');
    }
  });
};

initDatabase();