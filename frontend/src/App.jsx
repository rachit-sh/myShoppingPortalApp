import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { useAuth } from "./context/useAuth.js";

// Components
import Profile from "./components/Profile.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import CreateProduct from "./components/CreateProduct.jsx";
import Checkout from "./components/Checkout.jsx";

// CSS file for App
import "./App.css"

// --- Define the main App content inside a wrapper component ---
const AppContent = () => {
  // Now we can use the context hook anywhere in the application

  const { currentUser, checkAuth } = useAuth();

  // Check authentication status on mount 
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  
  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  if (CartProvider.cartError) {
    return (
      <div className="main-content-area" style={{textAlign: 'center', marginTop: '5rem'}}>
          <h2 style={{color: 'var(--danger)'}}>Unable to load data</h2>
          <p>{CartProvider.cartError}</p>
      </div>
    );
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
            element={<ProductList />}
          />

          {/* Protected Route for Creating Products */}
          <Route 
            path="/create-product" 
            element={currentUser ? <CreateProduct /> : <Navigate to="/login" replace />} 
          />
        
          {/* Cart Route
          Pass the state data down to the Cart component */}
          <Route
            path="/cart" 
            element={<Cart />}
          />

          {/* Checkout Route */}
          <Route 
             path="/checkout"
             element={<Checkout />}
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
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
