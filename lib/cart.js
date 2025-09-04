// TODO: Edit cart key if needed (cart_v1)
const CART_KEY = 'cart_v1';

export const getCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const setCart = (cart) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const addToCart = (id) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  
  setCart(cart);
  return cart;
};

export const removeFromCart = (id) => {
  const cart = getCart();
  const filteredCart = cart.filter(item => item.id !== id);
  setCart(filteredCart);
  return filteredCart;
};

export const clearCart = () => {
  setCart([]);
  return [];
};

export function addConfigured(product, cfg){ 
  // cfg: {shape, materialId, colorId, borderId, monogramOn, monogramText, monogramFont, price}
  const cart = getCart();
  const id = `${product.id}|${cfg.shape}|${cfg.materialId}|${cfg.colorId}|${cfg.borderId}|${cfg.monogramOn?cfg.monogramText:''}|${cfg.monogramFont}`;
  const existing = cart.find(i => i.id === id);
  if(existing){ 
    if (existing.custom === true) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      existing.quantity = (existing.quantity || 1) + 1;
    }
  }
  else{
    cart.push({
      id, qty:1, custom:true,
      name: `${product.name} – ${cfg.shape}`,
      price: cfg.price,
      options: cfg,
      image: product.image
    });
  }
  setCart(cart);
  return cart;
}