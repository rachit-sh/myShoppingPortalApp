import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth'; // We need auth to know when to fetch

const CartContext = createContext();

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const CartProvider = ({ children }) => {
    const { currentUser } = useAuth();

    // STATES for API-managed Cart
    const [cartItems, setCartItems] = useState([]);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [cartError, setCartError] = useState(null);

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
            // Map backend structure to frontend structure
            // Backend sends { cart: { items: [...] } }
            const items = response.data.cart.items.map(item => ({
                ...item.product, // Flatten product details (id, name, price)
                quantity: item.quantity
            }));
            setCartItems(items);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            // Don't set error string if it's just a 404 (empty cart new user)
            if (err.response && err.response.status !== 404) {
                 setCartError("Failed to load your cart.");
            }
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
            alert("Failed to update cart");
        }
    };
    
    // 3. Remove Item Entirely (DELETE)
    const removeFromCart = async (productId) => {
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
        }
    };

    // 4. Clear Cart
    const clearCart = async () => {
        if (!currentUser) return;
        try {
            await api.delete('/cart/clear'); 
            setCartItems([]);
        } catch (err) {
            console.error("Failed to clear cart on backend:", err);
        }
    };

    // --- Helper wrappers ---

    // Maps the old add function to the new API call
    const addToCart = (product) => {
        // Add 1 to the cart (quantity 1 means increase by 1)
        updateCartItem(product._id, 1);
    };
  
    // Maps the old decrease function to the new API call
    const decreaseQuantity = (productId) => {
        // Subtract 1 from the cart (quantity -1 means decrease by 1)
        updateCartItem(productId, -1);
    };


    // --- EFFECTS ---

    // Fetch cart on login/logout
    useEffect(() => {
        fetchCart();
    }, [fetchCart]); // Dependency on fetchCart ensures it runs when needed

    
    // Calculate total quantity for the badge
    const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            isCartLoading, 
            cartError, 
            addToCart, 
            decreaseQuantity, 
            removeFromCart, 
            clearCart,
            totalCartCount // Exporting the count for the Header
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
