import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart.jsx";

function App() {
  // 1. Define Cart State: An array to hold the items in the cart.
  const [cartItems, setCartItems] = useState([]);

  // 2. Define the Add to Cart function (The State Setter)
  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item._id === product._id);

    if (existingItem) {
      // If it exists, update its quantity
      setCartItems(
        cartItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 } // Increment quantity
            : item
        )
      );
    } else {
      // If it's a new item, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      // Using ... means to copy all properties of product. It is called Spread Operator.
    }
  };

  return (
    <div className="App">
      <header>
        <h1>My Shopping Portal</h1>
        {/* Display Cart Summary (e.g., total items) */}
        <p>
          Cart Total: **{cartItems.reduce((acc, item) => acc + item.quantity, 0)}** items
          <img src="cart-icon.png" alt="Cart Icon" className="cart-icon" />
        </p>
      </header>
      <main className="main-content-area"> {/* Add a class for layout */}
        {/* Pass the state data down to the Cart component */}
        <Cart items={cartItems} /> 

        {/* Pass the function down to the ProductList component as a Prop */}
        <ProductList onAddToCart={handleAddToCart} />
      </main>
      <footer>
        <p>&copy; 2025 | My Shopping Portal</p>
      </footer>
    </div>
  );
}

export default App;
