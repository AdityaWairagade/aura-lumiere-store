import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiHeart, FiPackage, FiRefreshCw } from 'react-icons/fi';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/common/StarRating';
import { PageSpinner } from '../components/common/Spinner';
import { formatPrice } from '../utils/formatters';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${slug}`);
        setProduct(data.data);
        if (data.data.variants?.length) {
          setSelectedVariant(data.data.variants[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <PageSpinner />;
  if (!product) return (
    <div className="pt-32 text-center">
      <p className="font-serif text-2xl text-gray-400">Product not found</p>
      <Link to="/shop" className="btn-outline mt-6 inline-block">Back to Shop</Link>
    </div>
  );

  const currentPrice = selectedVariant?.price ?? product.price;
  const finalPrice = product.discount?.percent > 0
    ? +(currentPrice * (1 - product.discount.percent / 100)).toFixed(2)
    : currentPrice;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant?.size, quantity);
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) { toast.error('Please sign in to save to wishlist'); return; }
    try {
      await api.put(`/users/wishlist/${product._id}`);
      toast.success('Wishlist updated');
    } catch { toast.error('Failed to update wishlist'); }
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-4 text-xs font-sans text-gray-400">
        <Link to="/" className="hover:text-gold-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-gold-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-noir">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div>
          <div className="aspect-square overflow-hidden bg-gray-50">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images?.[selectedImage]?.url || 'https://placehold.co/600?text=No+Image'}
              alt={product.images?.[selectedImage]?.alt || product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-gold-500' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-[10px] tracking-widest uppercase text-gold-500 font-sans mb-2">
            {product.brand}
          </p>
          <h1 className="font-serif text-4xl font-light text-noir mb-1">{product.name}</h1>
          {product.concentration && (
            <p className="text-sm text-gray-400 font-sans mb-3">{product.concentration}</p>
          )}

          {product.rating > 0 && (
            <div className="mb-4">
              <StarRating rating={product.rating} numReviews={product.numReviews} size={16} />
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-serif text-3xl text-noir">{formatPrice(finalPrice)}</span>
            {product.discount?.percent > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(currentPrice)}</span>
                <span className="text-sm text-red-600 font-sans">-{product.discount.percent}% off</span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-8">
            {product.shortDescription || product.description?.substring(0, 200)}
          </p>

          {/* Variant selector */}
          {product.variants?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase font-sans text-gray-500 mb-3">
                Size — <span className="text-noir">{selectedVariant?.size}</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.stock === 0}
                    className={`px-4 py-2 text-sm font-sans border transition-colors ${
                      selectedVariant?.size === v.size
                        ? 'border-noir bg-noir text-champagne'
                        : v.stock === 0
                        ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 hover:border-noir'
                    }`}
                  >
                    {v.size}
                    {v.stock === 0 && ' (Out)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <FiMinus size={14} />
              </button>
              <span className="px-4 py-2 text-sm font-sans min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <FiPlus size={14} />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-8">
            <button onClick={handleAddToCart} className="btn-primary flex-1">
              Add to Bag
            </button>
            <button
              onClick={handleWishlist}
              aria-label="Add to wishlist"
              className="border border-gray-200 px-4 py-3 hover:border-red-300 hover:text-red-500 transition-colors"
            >
              <FiHeart size={18} />
            </button>
          </div>

          {/* Trust */}
          <div className="flex flex-col gap-2 text-xs text-gray-400 font-sans">
            <span className="flex items-center gap-2"><FiPackage size={13} /> Free shipping on orders over $150</span>
            <span className="flex items-center gap-2"><FiRefreshCw size={13} /> 30-day returns</span>
          </div>

          {/* Notes */}
          {(product.notes?.top?.length || product.notes?.middle?.length || product.notes?.base?.length) && (
            <div className="mt-8 p-5 bg-white border border-gray-100">
              <p className="text-[10px] tracking-widest uppercase font-sans text-gray-400 mb-4">
                Fragrance Notes
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {[['Top', product.notes.top], ['Heart', product.notes.middle], ['Base', product.notes.base]].map(([label, notes]) => (
                  notes?.length > 0 && (
                    <div key={label}>
                      <p className="font-sans text-xs text-gold-600 uppercase tracking-wider mb-2">{label}</p>
                      <ul className="space-y-1">
                        {notes.map((n) => (
                          <li key={n} className="text-gray-600">{n}</li>
                        ))}
                      </ul>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="border-b border-gray-100 flex gap-8 mb-8">
          {['description', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-xs tracking-widest uppercase font-sans transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-noir text-noir'
                  : 'border-transparent text-gray-400 hover:text-noir'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <p className="text-gray-600 font-sans leading-relaxed max-w-3xl">{product.description}</p>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            {product.reviews?.length === 0 ? (
              <p className="text-gray-400 font-sans text-sm">No reviews yet. Be the first to share your experience.</p>
            ) : (
              <ul className="space-y-6">
                {product.reviews.map((r) => (
                  <li key={r._id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <StarRating rating={r.rating} />
                      <span className="text-sm font-sans font-medium text-noir">{r.name}</span>
                      <span className="text-xs text-gray-400 font-sans ml-auto">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-sans">{r.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
