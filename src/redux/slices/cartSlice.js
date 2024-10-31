import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // If item exists in cart, increase its quantity
        state.items[itemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add to cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      console.log('state : ',state.items);
      console.log('state : ',action.payload);
      console.log('Items Final: ',item);
      if (item) {
        item.quantity += 1;
        console.log('Items after update Qty: ',item);
      }
    },
    decreaseQuantity: (state, action) => {
      console.log('state : ',state.items);
      console.log('state : ',action.payload.id);
      const item = state.items.find(item => item.id === action.payload.id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
