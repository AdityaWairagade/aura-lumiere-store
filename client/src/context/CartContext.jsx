import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 12;

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, quantity = 1 } = action.payload;
      const key = `${product._id}-${size || 'default'}`;
      const existing = state.items.find((i) => i.key === key);

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }

      // Determine price from variant or top-level
      const variantPrice =
        size && product.variants
          ? product.variants.find((v) => v.size === size)?.price
          : null;
      const price = variantPrice ?? product.price ?? product.finalPrice;

      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            product: product._id,
            name: product.name,
            brand: product.brand,
            image: product.images?.[0]?.url || '',
            price,
            size: size || null,
            quantity,
          },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.key !== action.payload) };

    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.payload.key
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

const loadCart = () => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product, size, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, quantity } });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (key) => {
    dispatch({ type: 'REMOVE_ITEM', payload: key });
  };

  const updateQuantity = (key, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { key, quantity } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemsPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const shippingPrice = itemsPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const taxPrice = +(itemsPrice * TAX_RATE).toFixed(2);
  const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
