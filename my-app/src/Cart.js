import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, removeFromCart, increaseQuantity, decreaseQuantity } from "../src/store/cartSlice";
import "./Cart.css"; 
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, isCartVisible } = useSelector(state => state.cart);

  if (!isCartVisible) return null; 

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price * item.quantity} (${item.price}/item)</span>
            <div>
              <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>🗑️</button>
            </div>
          </div>
        ))
      )}
      <button onClick={() => dispatch(toggleCart())}>Close Cart</button>
    </div>
  );
};

export default Cart;
