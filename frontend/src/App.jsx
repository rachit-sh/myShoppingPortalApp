import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./context/useAuth.js";

// Components
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

// --- Define the main App content inside a wrapper component ---
const AppContent = () => {
  // Now we can use the context hook anywhere in the application

  const { currentUser, checkAuth } = useAuth();
  
  // Check authentication status on mount 
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
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

  // 3. Define the Decrease Quantity function
  const handleDecreaseQuantity = (productId) => {
    setCartItems(prevItems => {
      // Find the item to decrease
      const existingItem = prevItems.find(item => item._id === productId);

      if (existingItem.quantity === 1) {
        // If quantity is 1, remove the item from the cart
        return prevItems.filter(item => item._id !== productId);
      } else {
        // Otherwise, decrease the quantity by 1
        return prevItems.map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // 4. Define the Remove from Cart function
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  return (
    <div className="App">
      <Header />
      {/*
      <header>
        {/* Display Auth Status *\/}
        {currentUser ? (
            <span>Welcome, {currentUser.username}!</span>
        ) : (
            <span>Please log in or sign up.</span>
        )}
        <h1>My Shopping Portal</h1>
        <p>
          Cart Total: **{cartItems.reduce((acc, item) => acc + item.quantity, 0)}** items
          <img src="cart-icon.png" alt="Cart Icon" className="cart-icon" />
        </p>
      </header>
      */}
      <main className="main-content-area"> {/* Add a class for layout */}
        <Routes>
          {/* Home Route: Products List
          Pass the function down to the ProductList component as a Prop */}
          <Route
            path="/" 
            element={<ProductList onAddToCart={handleAddToCart} />} 
          />
        
          {/* Cart Route
          Pass the state data down to the Cart component */}
          <Route
            path="/cart" 
            element={<Cart
              items={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
              onDecrease={handleDecreaseQuantity}
            />}
          />

          {/* Auth Routes: Use Navigate to redirect if user is already logged in */}
          <Route 
              path="/login" 
              element={currentUser ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
              path="/signup" 
              element={currentUser ? <Navigate to="/" replace /> : <Signup />} 
          />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2025 | My Shopping Portal</p>
      </footer>
    </div>
  );
};

// The Root App component sets up the Router and Auth Provider
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
