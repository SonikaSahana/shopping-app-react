import { createSlice } from "@reduxjs/toolkit";
import { showNotification, hideNotification } from "./notificationSlice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isCartVisible: false,
    totalItems: 0
  },
  reducers: {
    toggleCart: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems++;
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        state.totalItems -= item.quantity;
      }
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalItems++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity--;
        state.totalItems--;
        if (item.quantity === 0) {
          state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        }
      }
    }
  }
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!"
      })
    );

    try {
      const response = await fetch("https://your-api-url.com/cart", {
        method: "PUT",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!"
        })
      );

      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data!"
        })
      );

      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
    }
  };
};

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} = cartSlice.actions;
export default cartSlice.reducer;
