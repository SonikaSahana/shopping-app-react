import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isCartVisible: false,
    totalItems: 0, 
  },
  reducers: {
    toggleCart: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems++; 
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        state.totalItems -= item.quantity; 
      }
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalItems++; 
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity--;
        state.totalItems--; // Decrease count
        if (item.quantity === 0) {
          state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
      }
    }
  },
});

export const { toggleCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
