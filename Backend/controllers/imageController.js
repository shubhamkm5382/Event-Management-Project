const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

const getAllImages = (req, res) => {
  const { category } = req.query;

  if (category) {
    Image.findByCategory(category, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  } else {
    Image.findAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  }
};

const getImageById = (req, res) => {
  const { id } = req.params;

  Image.findById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json(results[0]);
  });
};

const createImage = (req, res) => {
  const { title, description, category } = req.body;
  const userId = req.user.id;

  if (!title || !req.file) {
    return res.status(400).json({ error: 'Title and image are required' });
  }

  const imageUrl = `/uploads/images/${req.file.filename}`;

  Image.create({
    title,
    description: description || '',
    category: category || 'uncategorized',
    image_url: imageUrl,
    user_id: userId
  }, (err, results) => {
    if (err) {
      // Delete uploaded file if database operation fails
      fs.unlinkSync(req.file.path);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({
      message: 'Image uploaded successfully',
      imageId: results.insertId
    });
  });
};

const updateImage = (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  Image.update(id, { title, description, category }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ message: 'Image updated successfully' });
  });
};

const deleteImage = (req, res) => {
  const { id } = req.params;

  // First get the image to delete the file
  Image.findById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const image = results[0];
    const filePath = path.join(__dirname, '..', image.image_url);

    // Delete the image file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    Image.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({ message: 'Image deleted successfully' });
    });
  });
};

const likeImage = (req, res) => {
  const { id } = req.params;

  Image.incrementLikes(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ message: 'Image liked successfully' });
  });
};

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
  likeImage
};