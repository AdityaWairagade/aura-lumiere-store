import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import api from '../utils/api';
import ProductGrid from '../components/product/ProductGrid';

const CATEGORIES = ['for-her', 'for-him', 'unisex', 'limited-edition', 'gift-sets'];
const CONCENTRATIONS = ['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Reviewed' },
];

const ShopPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: category || searchParams.get('category') || '',
    concentration: searchParams.get('concentration') || '',
    sort: searchParams.get('sort') || 'newest',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    newArrival: searchParams.get('newArrival') === 'true',
    page: 1,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.concentration) params.set('concentration', filters.concentration);
      if (filters.sort) params.set('sort', filters.sort);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      if (filters.search) params.set('search', filters.search);
      if (filters.newArrival) params.set('newArrival', 'true');
      params.set('page', filters.page);
      params.set('limit', '12');

      const { data } = await api.get(`/products?${params}`);
      setProducts(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Sync URL category param
  useEffect(() => {
    if (category) {
      setFilters((f) => ({ ...f, category, page: 1 }));
    }
  }, [category]);

  const setFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      concentration: '',
      sort: 'newest',
      minPrice: '',
      maxPrice: '',
      search: '',
      newArrival: false,
      page: 1,
    });
  };

  const pageTitle = category
    ? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'All Fragrances';

  return (
    <div className="pt-24 min-h-screen">
      {/* Shop Header */}
      <div className="bg-cream border-b border-gray-100 py-10 text-center">
        <p className="text-[10px] tracking-widest uppercase text-gold-500 font-sans mb-1">
          Aura Lumière
        </p>
        <h1 className="font-serif text-4xl font-light text-noir">{pageTitle}</h1>
        <p className="text-sm text-gray-400 font-sans mt-2">
          {pagination.total} fragrance{pagination.total !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search fragrances..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="input-field w-56 py-2 text-xs"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => setFilter('sort', e.target.value)}
              className="input-field py-2 text-xs w-48"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-2 text-xs tracking-widest uppercase border border-gray-200 px-4 py-2 hover:border-gold-500 transition-colors"
            >
              <FiFilter size={13} /> Filters
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white border border-gray-100 p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Category */}
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3 font-sans">
                Category
              </p>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setFilter('category', '')}
                    className={`text-sm ${!filters.category ? 'text-gold-600 font-medium' : 'text-gray-600 hover:text-gold-600'}`}
                  >
                    All
                  </button>
                </li>
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setFilter('category', c)}
                      className={`text-sm capitalize ${filters.category === c ? 'text-gold-600 font-medium' : 'text-gray-600 hover:text-gold-600'}`}
                    >
                      {c.replace(/-/g, ' ')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concentration */}
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3 font-sans">
                Concentration
              </p>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setFilter('concentration', '')}
                    className={`text-sm ${!filters.concentration ? 'text-gold-600 font-medium' : 'text-gray-600 hover:text-gold-600'}`}
                  >
                    All
                  </button>
                </li>
                {CONCENTRATIONS.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setFilter('concentration', c)}
                      className={`text-sm ${filters.concentration === c ? 'text-gold-600 font-medium' : 'text-gray-600 hover:text-gold-600'}`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3 font-sans">
                Price Range
              </p>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilter('minPrice', e.target.value)}
                  className="input-field py-1.5 text-xs w-20"
                />
                <span className="text-gray-400">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilter('maxPrice', e.target.value)}
                  className="input-field py-1.5 text-xs w-20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                <FiX size={13} /> Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-14">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setFilters((f) => ({ ...f, page: p }))}
                className={`w-9 h-9 text-sm font-sans border transition-colors ${
                  filters.page === p
                    ? 'bg-noir text-champagne border-noir'
                    : 'border-gray-200 hover:border-gold-500 hover:text-gold-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
