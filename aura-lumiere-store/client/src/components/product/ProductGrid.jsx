import ProductCard from './ProductCard';
import { PageSpinner } from '../common/Spinner';

const ProductGrid = ({ products, loading }) => {
  if (loading) return <PageSpinner />;

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-2xl font-light text-gray-400 mb-2">
          No fragrances found
        </p>
        <p className="text-sm text-gray-400 font-sans">
          Try adjusting your filters or browse all collections.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
