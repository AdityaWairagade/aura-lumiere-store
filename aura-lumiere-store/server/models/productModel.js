import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

const sizeVariantSchema = new mongoose.Schema({
  size: { type: String, required: true }, // e.g. "30ml", "50ml", "100ml"
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['for-him', 'for-her', 'unisex', 'limited-edition', 'gift-sets'],
    },
    concentration: {
      type: String,
      enum: ['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Eau Fraîche'],
    },
    notes: {
      top: [String],
      middle: [String],
      base: [String],
    },
    images: [
      {
        public_id: { type: String },
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    variants: [sizeVariantSchema],
    // Fallback single price/stock when no variants
    price: { type: Number },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    discount: {
      percent: { type: Number, default: 0, min: 0, max: 100 },
      validUntil: { type: Date },
    },
    reviews: [reviewSchema],
    numReviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    tags: [String],
  },
  { timestamps: true }
);

// Auto-generate slug from name
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual for discounted price
productSchema.virtual('finalPrice').get(function () {
  if (!this.price) return null;
  if (this.discount?.percent > 0) {
    return +(this.price * (1 - this.discount.percent / 100)).toFixed(2);
  }
  return this.price;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
