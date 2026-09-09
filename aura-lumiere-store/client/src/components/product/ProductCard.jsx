import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import StarRating from '../common/StarRating';
import { formatPrice } from '../../utils/formatters';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const basePrice = product.variants?.length
    ? Math.min(...product.variants.map((v) => v.price))
    : product.price;

  const finalPrice =
    product.discount?.percent > 0
      ? +(basePrice * (1 - product.discount.percent / 100)).toFixed(2)
      : basePrice;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, product.variants?.[0]?.size || null, 1);
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to use your wishlist');
      return;
    }
    try {
      await api.put(`/users/wishlist/${product._id}`);
      toast.success('Wishlist updated');
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
          <img
            src={product.images?.[0]?.url || 'https://placehold.co/400x533?text=No+Image'}
            alt={product.images?.[0]?.alt || product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewArrival && (
              <span className="bg-noir text-champagne text-[9px] tracking-widest px-2 py-0.5 uppercase font-sans">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-gold-500 text-noir text-[9px] tracking-widest px-2 py-0.5 uppercase font-sans">
                Bestseller
              </span>
            )}
            {product.discount?.percent > 0 && (
              <span className="bg-red-600 text-white text-[9px] tracking-widest px-2 py-0.5 uppercase font-sans">
                -{product.discount.percent}%
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/10 transition-colors duration-300" />

          {/* Actions */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              aria-label="Quick add to cart"
              className="flex items-center gap-2 bg-noir text-champagne text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-gold-600 transition-colors"
            >
              <FiShoppingBag size={13} /> Add to Bag
            </button>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50"
          >
            <FiHeart size={14} className="text-noir hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <p className="text-[10px] tracking-widest uppercase text-gold-500 font-sans mb-1">
            {product.brand}
          </p>
          <h3 className="font-serif text-lg font-light text-noir group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>
          {product.concentration && (
            <p className="text-xs text-gray-400 font-sans mt-0.5">{product.concentration}</p>
          )}

          {product.rating > 0 && (
            <div className="mt-1.5">
              <StarRating rating={product.rating} numReviews={product.numReviews} />
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            {product.variants?.length > 0 && (
              <span className="text-xs text-gray-400 font-sans">from</span>
            )}
            <span className="font-sans font-medium text-noir">
              {formatPrice(finalPrice)}
            </span>
            {product.discount?.percent > 0 && (
              <span className="text-sm text-gray-400 line-through font-sans">
                {formatPrice(basePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
