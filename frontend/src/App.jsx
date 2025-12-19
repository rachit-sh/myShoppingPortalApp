import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./context/useAuth.js";
import axios from "axios";
import Profile from "./components/Profile.jsx";

// Components
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

// CSS file for App
import "./App.css"

// API Instance (Ensure this uses withCredentials for cookies)
const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// --- Define the main App content inside a wrapper component ---
const AppContent = () => {
  // Now we can use the context hook anywhere in the application

  const { currentUser, checkAuth } = useAuth();

  // STATES for API-managed Cart
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  // Check authentication status on mount 
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  // ----------------------------------------------------
  // API FUNCTIONS (CRUD Operations)
  // ----------------------------------------------------

  // 1. Fetch Cart (READ)
  const fetchCart = useCallback(async () => {
      if (!currentUser) {
          setCartItems([]);
          return; // Don't fetch if not logged in
      }
      setIsCartLoading(true);
      setCartError(null);
      try {
          const response = await api.get('/cart');
          // The cart object from the backend has a structure: { cart: { items: [...] } }
          setCartItems(response.data.cart.items.map(item => ({
              ...item.product, // Flatten product details (id, name, price)
              quantity: item.quantity
          })));
      } catch (err) {
          console.error("Failed to fetch cart:", err);
          setCartError("Failed to load your cart. Please try logging in again.");
      } finally {
          setIsCartLoading(false);
      }
  }, [currentUser]); // Dependency on currentUser ensures fetch runs on login/logout

  // 2. Add or Adjust Item Quantity (CREATE/UPDATE)
  const updateCartItem = async (productId, quantity) => {
      if (!currentUser) return; // Cart actions only for logged-in users

      try {
          const response = await api.post('/cart', { productId, quantity });
          
          // The response contains the updated cart data from the backend
          setCartItems(response.data.cart.items.map(item => ({
              ...item.product,
              quantity: item.quantity
          })));
      } catch (err) {
          console.error("Failed to update cart:", err);
          setCartError("Failed to update cart. Session may have expired.");
      }
  };
  
  // 3. Remove Item Entirely (DELETE)
  const handleRemoveFromCart = async (productId) => {
      if (!currentUser) return;

      try {
          // Note: Using DELETE method on the backend route, sending productId in the body
          const response = await api.delete('/cart', { data: { productId } });
          
          setCartItems(response.data.cart.items.map(item => ({
              ...item.product,
              quantity: item.quantity
          })));
      } catch (err) {
          console.error("Failed to remove item:", err);
          setCartError("Failed to remove item. Session may have expired.");
      }
  };

  // ----------------------------------------------------
  // Local Helper Functions (Mapping to API calls)
  // ----------------------------------------------------
  
  // Maps the old add function to the new API call
  const handleAddToCart = (product) => {
      // Add 1 to the cart (quantity 1 means increase by 1)
      updateCartItem(product._id, 1);
  };
  
  // Maps the old decrease function to the new API call
  const handleDecreaseQuantity = (productId) => {
      // Subtract 1 from the cart (quantity -1 means decrease by 1)
      updateCartItem(productId, -1);
  };


  // ----------------------------------------------------
  // EFFECTS
  // ----------------------------------------------------
  
  // Fetch cart whenever the user logs in or logs out
  useEffect(() => {
      fetchCart();
  }, [fetchCart]); // Dependency on fetchCart ensures it runs when needed

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  if (cartError) {
      return <h2>Error: {cartError}</h2>; // Basic error screen
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content-area"> {/* Add a class for layout */}
        <Routes>
          {/* Home Route: Products List
          Pass the function down to the ProductList component as a Prop
          Disable add button if not logged in */}
          <Route
            path="/" 
            element={<ProductList 
              onAddToCart={currentUser ? handleAddToCart : null}
              isAuthenticated={!!currentUser}
            />}
          />
        
          {/* Cart Route
          Pass the state data down to the Cart component */}
          <Route
            path="/cart" 
            element={isCartLoading ?
              <h2>Loading Cart...</h2> :
              <Cart
                items={cartItems}
                onAdd={handleAddToCart}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveFromCart}
              />
            }
          />

          {/* Public Auth Routes: Use Navigate to redirect if user is already logged in */}
          <Route 
              path="/login" 
              element={currentUser ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
              path="/signup" 
              element={currentUser ? <Navigate to="/" replace /> : <Signup />} 
          />

          {/* Protected Profile Route */}
          <Route
            path="/profile"
            element={currentUser ? <Profile /> : <Navigate to="/login" replace />}
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
