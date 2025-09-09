'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addConfigured } from '../../../../lib/cart';
import { useCart } from '../../../../lib/CartContext';
import products from '../../../../data/products.json';
import colors from '../../../../data/colors.json';

const fontFamilies = {
  Serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  Sans: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  Script: 'cursive',
};

export default function ProductConfigurator({ params }) {
  const { slug } = params;

  // Find the product from the imported data
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-zinc-600">Product not found.</div>
      </div>
    );
  }

  // Monogram state
  const [monogramOn, setMonogramOn] = useState(false);
  const [monogramText, setMonogramText] = useState('');
  const [monogramFont, setMonogramFont] = useState('Serif');

  // Create color lookup map
  const colorById = {};
  colors.forEach((c) => {
    colorById[c.id] = c;
  });

  // Default values
  const defaultShape = product.shapes?.[0] || 'rectangle';
  const defaultColorId = product.defaultColor || colors?.[0]?.id || '';
  const defaultBorderId = product.defaultBorder || colors?.[0]?.id || '';

  // Calculate price
  const basePrice = product.basePrice || 0;
  const monogramPrice = monogramOn ? (product.monogramPrice || 0) : 0;
  const totalPrice = basePrice + monogramPrice;

  const handleMonogramTextChange = (e) => {
    const v = (e.target.value || '').toUpperCase().slice(0, 3).replace(/[^A-Z]/g, '');
    setMonogramText(v);
  };

  const { updateCart } = useCart();

  const handleAddToCart = () => {
    const cfg = {
      shape: defaultShape,
      materialId: product.materials?.[0]?.id || '',
      materialName: product.materials?.[0]?.name || '',
      colorId: defaultColorId,
      colorName: colorById[defaultColorId]?.name || '',
      borderId: defaultBorderId,
      borderName: colorById[defaultBorderId]?.name || '',
      monogramOn,
      monogramText: monogramOn ? monogramText : '',
      monogramFont,
      price: totalPrice,
    };
    const newCart = addConfigured(product, cfg);
    updateCart(newCart);
    alert('Added to cart');
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/products" className="text-zinc-600 hover:text-zinc-900">← Back to Products</Link>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl p-6 lg:p-8">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details & Monogram Configuration */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-zinc-900 mb-6">{product.name}</h1>
            
            <div className="space-y-8">
              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-serif font-bold text-zinc-900">
                  €{(totalPrice / 100).toFixed(2)}
                  {monogramOn && (
                    <span className="text-sm text-zinc-600 ml-2">
                      (Base: €{(basePrice / 100).toFixed(2)} + Monogram: €{(monogramPrice / 100).toFixed(2)})
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">Shapes</h3>
                  <p className="text-zinc-600">{product.shapes?.join(', ') || 'Standard'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-2">Materials</h3>
                  <p className="text-zinc-600">{product.materials?.map(m => m.name).join(', ') || 'Various'}</p>
                </div>
              </div>

              {/* Monogram Configuration */}
              {product.monogramPrice && (
                <div>
                  <h2 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Add Monogram</h2>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setMonogramOn((v) => !v)}
                      className={`px-4 py-2 rounded-xl border ${
                        monogramOn 
                          ? 'bg-zinc-900 text-white border-zinc-900' 
                          : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
                      }`}
                    >
                      {monogramOn ? 'ON' : 'OFF'}
                    </button>
                    <span className="text-sm text-zinc-600">
                      +€{((product.monogramPrice || 0) / 100).toFixed(2)}
                    </span>
                  </div>

                  {monogramOn && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={monogramText}
                        onChange={handleMonogramTextChange}
                        maxLength={3}
                        placeholder="ABC"
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                      <select
                        value={monogramFont}
                        onChange={(e) => setMonogramFont(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      >
                        {Object.keys(fontFamilies).map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Add to Cart */}
              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-zinc-900 text-white py-3 px-6 rounded-xl hover:bg-zinc-800 transition-all font-medium"
                >
                  Add to Cart
                </button>
              </div>

              {/* Link to Full Customizer */}
              <div className="pt-2">
                <Link
                  href="/customize"
                  className="text-sm text-zinc-600 hover:text-zinc-900 underline"
                >
                  Want more customization options? Try our full configurator →
                </Link>
              </div>
              
              <p className="text-sm text-zinc-500">Ships made-to-order. Crafted in Italy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


