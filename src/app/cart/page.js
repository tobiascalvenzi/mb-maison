// TODO: Edit cart functionality and styling as needed
'use client';

import { useState, useEffect } from 'react';
import { getCart, removeFromCart, clearCart } from '../../../lib/cart';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const loadCart = () => {
      const cartData = getCart();
      setCart(cartData);
    };

    loadCart();
    // Listen for storage changes (in case cart is modified in another tab)
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  const getProductDetails = (productId) => {
    return products.find(p => p.id === productId);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.custom) {
        const qty = item.qty || 1;
        return total + (item.price || 0) * qty;
      }
      const product = getProductDetails(item.id);
      return total + (product ? (product.basePrice || 0) * (item.quantity || 1) : 0);
    }, 0);
  };

  const handleCheckout = (stripeLink) => {
    window.open(stripeLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-zinc-600">Loading cart...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl p-16">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-4">Your Cart is Empty</h1>
            <p className="text-zinc-600 mb-8 text-lg">Start shopping to add beautiful Italian textiles to your cart.</p>
            <a
              href="/products"
              className="inline-block bg-zinc-900 text-white px-8 py-4 text-lg font-medium rounded-xl hover:bg-zinc-800 transition-all hover:-translate-y-[1px]"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-12 text-center">Shopping Cart</h1>
        
        <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl overflow-hidden">
          <div className="p-8">
            {cart.map((item) => {
              if (item.custom) {
                const product = products.find(p => p.image === item.image) || { name: item.name, image: item.image };
                const opts = item.options || {};
                const summaryParts = [];
                if (opts.materialName) summaryParts.push(opts.materialName);
                if (opts.colorName) summaryParts.push(opts.colorName);
                if (opts.borderName) summaryParts.push(`Border ${opts.borderName}`);
                if (opts.monogramOn && opts.monogramText) summaryParts.push(`Monogram '${opts.monogramText}', ${opts.monogramFont}`);
                const qty = item.qty || 1;
                return (
                  <div key={item.id} className="flex items-center py-6 border-b border-zinc-200/60 last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl mr-6"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-serif font-semibold text-zinc-900">{item.name}</h3>
                      <p className="text-zinc-600 text-sm mb-2">{summaryParts.join(' • ')}</p>
                      <div className="flex items-center">
                        <span className="text-zinc-500 mr-6">Quantity: {qty}</span>
                        <span className="text-lg font-serif font-semibold text-zinc-900">
                          €{(((item.price||0) * qty) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-zinc-400 hover:text-zinc-600 transition-colors p-2"
                      aria-label="Remove item from cart"
                    >
                      🗑️
                    </button>
                  </div>
                );
              }
              const product = getProductDetails(item.id);
              if (!product) return null;
              return (
                <div key={item.id} className="flex items-center py-6 border-b border-zinc-200/60 last:border-b-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-zinc-900">{product.name}</h3>
                    <div className="flex items-center">
                      <span className="text-zinc-500 mr-6">Quantity: {item.quantity}</span>
                      <span className="text-lg font-serif font-semibold text-zinc-900">
                        €{(((product.basePrice||0) * (item.quantity||1)) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-zinc-400 hover:text-zinc-600 transition-colors p-2"
                    aria-label="Remove item from cart"
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="bg-zinc-50 p-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-serif font-semibold text-zinc-900">Total:</span>
              <span className="text-2xl font-serif font-bold text-zinc-900">
                €{(getTotalPrice() / 100).toFixed(2)}
              </span>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleClearCart}
                className="flex-1 border border-zinc-900 text-zinc-900 py-3 px-6 rounded-xl hover:bg-zinc-900 hover:text-white transition-all font-medium"
              >
                Clear Cart
              </button>
              {(() => {
                const nonCustomItems = cart.filter(i => !i.custom);
                const customItems = cart.filter(i => i.custom);
                if (nonCustomItems.length === 1 && customItems.length === 0) {
                  const only = nonCustomItems[0];
                  const prod = getProductDetails(only.id);
                  if (prod && prod.stripePaymentLink) {
                    return (
                      <button
                        onClick={() => handleCheckout(prod.stripePaymentLink)}
                        className="flex-1 bg-zinc-900 text-white py-3 px-6 rounded-xl hover:bg-zinc-800 transition-all font-medium"
                      >
                        Checkout
                      </button>
                    );
                  }
                }
                return (
                  <div className="flex-1 bg-zinc-200 text-zinc-600 py-3 px-6 rounded-xl text-center font-medium">
                    For personalized items, we’ll confirm by email
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
