// TODO: Edit product names, descriptions, prices (in cents), and Stripe payment links
'use client';

import { useState, useEffect } from 'react';
import { addToCart } from '../../../lib/cart';

export default function Products() {
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

  const handleAddToCart = (productId) => {
    addToCart(productId);
    // You could add a toast notification here
    alert('Product added to cart!');
  };

  const handleBuyNow = (stripeLink) => {
    window.open(stripeLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-zinc-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-6">Our Collection</h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handcrafted Italian textile accessories, designed with sustainability and elegance in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white ring-1 ring-zinc-200/60 rounded-xl overflow-hidden hover:-translate-y-[1px] transition-all duration-300 shadow-sm">
              <div className="aspect-[3/2] w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-3">{product.name}</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif font-bold text-zinc-900">
                    €{(product.price / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex-1 bg-zinc-900 text-white py-3 px-4 rounded-xl hover:bg-zinc-800 transition-all font-medium"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(product.stripePaymentLink)}
                    className="flex-1 border border-zinc-900 text-zinc-900 py-3 px-4 rounded-xl hover:bg-zinc-900 hover:text-white transition-all font-medium"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
