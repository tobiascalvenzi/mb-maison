// src/app/products/page.js  (NO "use client")
import Link from 'next/link';
import products from "../../../data/products.json";

const fmt = (cents, cur="EUR") => `${cur==="EUR" ? "€" : ""}${(cents/100).toFixed(2)}`;

export default function Products() {
  // Ensure products is an array (defensive programming)
  const list = Array.isArray(products) ? products : [];
  
  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-6">Customize Your Placemats</h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Choose your shape, material, colors, and monogram.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <article className="bg-white ring-1 ring-zinc-200/60 rounded-xl overflow-hidden hover:-translate-y-[1px] transition-all duration-300 shadow-sm cursor-pointer">
                {/* Product image with proper aspect ratio */}
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product details */}
                <div className="p-8">
                  <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-3">{product.name}</h3>
                  
                  {/* Price display */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif font-bold text-zinc-900">
                      From {fmt(product.basePrice, product.currency)}
                    </span>
                  </div>
                  
                  {/* Product description/info */}
                  <div className="text-sm text-zinc-600 space-y-2">
                    <p>Available shapes: {product.shapes?.join(', ') || 'Standard'}</p>
                    <p>Materials: {product.materials?.map(m => m.name).join(', ') || 'Various'}</p>
                    {product.monogramPrice && (
                      <p>Monogram available (+{fmt(product.monogramPrice, product.currency)})</p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {/* Fallback message if no products found */}
        {list.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-zinc-600">No products found. Please check the data file.</p>
          </div>
        )}
      </div>
    </main>
  );
}
