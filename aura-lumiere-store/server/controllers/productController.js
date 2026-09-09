import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Get all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const query = {};

  // Filter by category
  if (req.query.category) query.category = req.query.category;
  // Filter by concentration
  if (req.query.concentration) query.concentration = req.query.concentration;
  // Filter by brand
  if (req.query.brand) query.brand = new RegExp(req.query.brand, 'i');
  // Featured only
  if (req.query.featured === 'true') query.isFeatured = true;
  // New arrivals
  if (req.query.newArrival === 'true') query.isNewArrival = true;
  // Bestsellers
  if (req.query.bestseller === 'true') query.isBestseller = true;
  // Price range
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
  }
  // Search
  if (req.query.search) {
    query.$or = [
      { name: new RegExp(req.query.search, 'i') },
      { brand: new RegExp(req.query.search, 'i') },
      { tags: new RegExp(req.query.search, 'i') },
    ];
  }

  // Sort options
  const sortMap = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    'price-low': { price: 1 },
    'price-high': { price: -1 },
    rating: { rating: -1 },
    popular: { numReviews: -1 },
  };
  const sort = sortMap[req.query.sort] || { createdAt: -1 };

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select('-reviews');

  res.json({
    success: true,
    data: products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate(
    'reviews.user',
    'name avatar'
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: product });
});

// @desc    Get single product by ID
// @route   GET /api/products/id/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'reviews.user',
    'name avatar'
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: product });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: product });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ success: true, message: 'Product removed' });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true })
    .limit(8)
    .select('-reviews');
  res.json({ success: true, data: products });
});
