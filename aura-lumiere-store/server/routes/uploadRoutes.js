import express from 'express';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
} from '../controllers/uploadController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), uploadImage);
router.post('/multiple', protect, adminOnly, upload.array('images', 8), uploadMultipleImages);
router.delete('/:publicId', protect, adminOnly, deleteImage);

export default router;
