import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "./store/cartSlice";
import { sendCartData } from "./store/cartSlice";
import Products from "./Products";
import Cart from "./Cart";
import Notification from "./notification";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isCartVisible, totalItems, cartItems } = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(sendCartData(cartItems));
  }, [cartItems, dispatch]);

  return (
    <div className="app">
      {notification.status && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <nav>
        <h1>ReduxCart</h1>
        <button onClick={() => dispatch(toggleCart())}>
          🛒 Cart ({totalItems}) {isCartVisible ? "❌" : ""}
        </button>
      </nav>

      <Cart />
      <Products />
    </div>
  );
}

export default App;
