import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating = 0, numReviews, size = 14, className = '' }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return 'full';
    if (rating >= i + 0.5) return 'half';
    return 'empty';
  });

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="flex items-center gap-0.5">
        {stars.map((type, i) =>
          type === 'full' ? (
            <FaStar key={i} size={size} className="text-gold-500" />
          ) : type === 'half' ? (
            <FaStarHalfAlt key={i} size={size} className="text-gold-500" />
          ) : (
            <FiStar key={i} size={size} className="text-gold-300" />
          )
        )}
      </span>
      {numReviews !== undefined && (
        <span className="text-xs text-gray-400 font-sans">({numReviews})</span>
      )}
    </span>
  );
};

export default StarRating;
