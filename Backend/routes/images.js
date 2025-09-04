const express = require('express');
const router = express.Router();
const {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
  likeImage
} = require('../controllers/imageController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getAllImages);
router.get('/:id', getImageById);
router.post('/:id/like', likeImage);

// Protected admin routes
router.post('/', authenticateToken, requireAdmin, upload.single('image'), createImage);
router.put('/:id', authenticateToken, requireAdmin, updateImage);
router.delete('/:id', authenticateToken, requireAdmin, deleteImage);

module.exports = router;