import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../src/store/cartSlice";
import Products from "./Products";
import Cart from "./Cart";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isCartVisible, totalItems } = useSelector(state => state.cart);

  return (
    <div className="app">
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
