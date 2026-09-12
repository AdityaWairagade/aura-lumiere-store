import asyncHandler from 'express-async-handler';
import { cloudinary } from '../middleware/uploadMiddleware.js';

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  res.json({
    success: true,
    data: {
      public_id: req.file.filename,
      url: req.file.path,
    },
  });
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private/Admin
export const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No files uploaded');
  }

  const images = req.files.map((file) => ({
    public_id: file.filename,
    url: file.path,
  }));

  res.json({ success: true, data: images });
});

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private/Admin
export const deleteImage = asyncHandler(async (req, res) => {
  const publicId = decodeURIComponent(req.params.publicId);

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== 'ok') {
    res.status(400);
    throw new Error('Failed to delete image');
  }

  res.json({ success: true, message: 'Image deleted' });
});
