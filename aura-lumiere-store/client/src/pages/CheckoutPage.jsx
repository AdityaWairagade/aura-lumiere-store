import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatters';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: userInfo?.name || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });

  const set = (key) => (e) => setAddress((a) => ({ ...a, [key]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!items.length) { toast.error('Your cart is empty'); return; }
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        product: i.product,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
      }));

      const { data } = await api.post('/orders', {
        orderItems,
        shippingAddress: address,
        paymentMethod: 'stripe',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      clearCart();
      navigate(`/order-confirmation/${data.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'fullName', label: 'Full Name', type: 'text', cols: 2 },
    { key: 'street', label: 'Street Address', type: 'text', cols: 2 },
    { key: 'city', label: 'City', type: 'text', cols: 1 },
    { key: 'state', label: 'State / Province', type: 'text', cols: 1 },
    { key: 'postalCode', label: 'Postal Code', type: 'text', cols: 1 },
    { key: 'country', label: 'Country', type: 'text', cols: 1 },
  ];

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-light text-noir mb-2">Checkout</h1>
        <div className="gold-divider mb-10 mx-0" />

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Shipping */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-xl text-noir mb-6">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.cols === 2 ? 'col-span-2' : 'col-span-1'}>
                  <label htmlFor={f.key} className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type={f.type}
                    value={address[f.key]}
                    onChange={set(f.key)}
                    required
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 text-sm text-amber-800 font-sans">
              <strong>Demo Mode:</strong> This order will be placed without real payment processing.
              Stripe integration is ready — add your keys to <code>.env</code> to enable live payments.
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 p-6 sticky top-28">
              <h2 className="font-serif text-xl text-noir mb-5">Order Summary</h2>
              <ul className="space-y-3 mb-5">
                {items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3 text-sm font-sans">
                    <img src={item.image} alt={item.name} className="w-10 h-12 object-cover bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-noir truncate">{item.name}</p>
                      {item.size && <p className="text-gray-400 text-xs">{item.size}</p>}
                      <p className="text-gray-400 text-xs">× {item.quantity}</p>
                    </div>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 text-sm font-sans border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span>{formatPrice(itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span><span>{shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span><span>{formatPrice(taxPrice)}</span>
                </div>
                <div className="flex justify-between font-medium text-noir border-t border-gray-100 pt-2">
                  <span>Total</span><span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="btn-primary w-full justify-center mt-6"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
