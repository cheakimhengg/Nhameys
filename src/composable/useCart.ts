import { ref } from 'vue';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}

export default function useCart() {
  const cart = ref<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItemIndex = cart.value.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
      cart.value[existingItemIndex].quantity += 1;
    } else {
      cart.value.push({ ...item, quantity: 1 });
    }
  };

  const removeFromCart = (itemId: number) => {
    const itemIndex = cart.value.findIndex((item) => item.id === itemId);

    if (itemIndex >= 0) {
      if (cart.value[itemIndex].quantity > 1) {
        cart.value[itemIndex].quantity -= 1;
      } else {
        cart.value.splice(itemIndex, 1);
      }
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  return { cart, addToCart, removeFromCart, clearCart };
}
