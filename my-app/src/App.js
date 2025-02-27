import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "./store/cartSlice";
import Products from "./Products";
import Cart from "./Cart";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector(state => state.cart.isCartVisible);

  return (
    <div className="app">
      <nav>
        <h1>ReduxCart</h1>
        <button onClick={() => dispatch(toggleCart())}>
          My Cart {isCartVisible ? "🛒" : "❌"}
        </button>
      </nav>
      <Cart />
      <Products />
    </div>
  );
}

export default App;
