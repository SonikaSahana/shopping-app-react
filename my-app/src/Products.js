import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../src/store/cartSlice";
import "./Products.css"; 

const products = [
  { id: 1, name: "Test Item", price: 6 },
  { id: 2, name: "Laptop", price: 900 },
  { id: 3, name: "Headphones", price: 50 }
];

const Products = () => {
  const dispatch = useDispatch();

  return (
    <div className="products-container">
      <h2>Buy Your Favorite Products</h2>
      {products.map((product) => (
        <div key={product.id} className="product">
          <h4>{product.name}</h4>
          <p>${product.price}</p>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
