import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user already reviewed
  const existingReview = await Review.findOne({
    user: req.user._id,
    product: productId,
  });
  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }

  // Check for verified purchase
  const hasPurchased = await Order.findOne({
    user: req.user._id,
    'orderItems.product': productId,
    isPaid: true,
  });

  const review = await Review.create({
    user: req.user._id,
    product: productId,
    name: req.user.name,
    rating,
    title,
    comment,
    isVerifiedPurchase: !!hasPurchased,
  });

  res.status(201).json({ success: true, data: review });
});

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Review.countDocuments({ product: req.params.productId });
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    data: reviews,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @desc    Update own review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this review');
  }

  review.rating = req.body.rating || review.rating;
  review.title = req.body.title || review.title;
  review.comment = req.body.comment || review.comment;

  const updatedReview = await review.save();
  res.json({ success: true, data: updatedReview });
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this review');
  }

  await review.deleteOne();
  res.json({ success: true, message: 'Review removed' });
});
