import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/product/ProductCard';
import { PageSpinner } from '../components/common/Spinner';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setWishlist(data.data.wishlist || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <PageSpinner />;

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-light text-noir mb-2">My Wishlist</h1>
        <div className="gold-divider mb-10 mx-0" />

        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light text-gray-400 mb-4">
              Your wishlist is empty
            </p>
            <Link to="/shop" className="btn-primary">Discover Fragrances</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
