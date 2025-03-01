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
    },
    setCartData: (state, action) => {
      state.cartItems = action.payload;
      state.totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0);
    }
  }
});

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Loading...",
        message: "Fetching cart data!"
      })
    );

    try {
      const response = await fetch("https://your-api-url.com/cart"); 

      if (!response.ok) {
        throw new Error("Fetching cart data failed!");
      }

      const data = await response.json();

      dispatch(setCartData(data)); 

      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Cart loaded successfully!"
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
          message: "Failed to load cart data!"
        })
      );

      setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
    }
  };
};


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
  decreaseQuantity,
  setCartData
} = cartSlice.actions;
export default cartSlice.reducer;
