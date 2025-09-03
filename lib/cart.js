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
