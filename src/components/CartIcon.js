'use client';

import Link from 'next/link';
import { useCart } from '../../lib/CartContext';

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <div className="relative p-2">
        {/* Shopping cart icon */}
        <svg 
          className="w-6 h-6 text-zinc-900 hover:text-zinc-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
          />
        </svg>
        
        {/* Cart count badge */}
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
