import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatters';

const CartPage = () => {
  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-light text-noir mb-2">Your Bag</h1>
        <div className="gold-divider mb-10 mx-0" />

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light text-gray-400 mb-4">Your bag is empty</p>
            <p className="text-sm text-gray-400 font-sans mb-8">
              Discover our curated collection of luxury fragrances.
            </p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.key} className="flex gap-5 border-b border-gray-100 pb-6">
                  <Link to={`/product/${item.key.split('-')[0]}`}>
                    <img
                      src={item.image || 'https://placehold.co/80x100?text=No+Image'}
                      alt={item.name}
                      className="w-20 h-24 object-cover bg-gray-50 shrink-0"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-noir">{item.name}</h3>
                    {item.size && (
                      <p className="text-xs text-gray-400 font-sans mt-0.5">{item.size}</p>
                    )}
                    <p className="text-sm font-sans text-noir mt-1">{formatPrice(item.price)}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          aria-label="Decrease"
                          className="px-2 py-1.5 hover:bg-gray-50"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-sans">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase"
                          className="px-2 py-1.5 hover:bg-gray-50"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        aria-label="Remove item"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-sans font-medium text-noir">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 p-6">
                <h2 className="font-serif text-xl text-noir mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm font-sans">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(itemsPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span>{formatPrice(taxPrice)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-medium text-noir">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {shippingPrice > 0 && (
                  <p className="text-xs text-gray-400 font-sans mt-3">
                    Add {formatPrice(150 - itemsPrice)} more for free shipping
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full mt-6 justify-center"
                >
                  Checkout <FiArrowRight size={15} />
                </button>

                <Link
                  to="/shop"
                  className="block text-center text-xs tracking-widest uppercase text-gray-400 hover:text-gold-600 transition-colors mt-4 font-sans"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
