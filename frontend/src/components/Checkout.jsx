import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { useAuth } from '../context/useAuth.js';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const { currentUser } = useAuth();
    const [isOrdered, setIsOrdered] = useState(false);
    const [couponApplied, setCouponApplied] = useState(false);
    
    // Local state for the temporary address (not stored in backend)
    const [address, setAddress] = useState({
        fullName: '',
        street: '',
        city: '',
        pinCode: '',
        state: ''
    });

    // Local state to store total price to display in the final receipt
    const [lastTotalPaid, setLastTotalPaid] = useState(0);

    // Redirect if not logged in or cart is empty
    if (!currentUser) return <Navigate to="/login" />;
    if (cartItems.length === 0 && !isOrdered) return <Navigate to="/cart" />;

    // Calculate total locally to display on the receipt
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Handle structure whether populated or flat
            const price = item.product?.price || item.price || 0;
            return total + price * item.quantity;
        }, 0);
    };

    const totalPrice = couponApplied ? (calculateTotal() * 0.7).toFixed(2) : calculateTotal().toFixed(2);

    const handleInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const applyCoupon = () => {
        const couponCode = document.querySelector('input[name="coupon"]').value;
        if (couponCode === "NEWYEAR2025") {
            if (couponApplied) {
                alert("Coupon already applied.");
                return;
            }
            setCouponApplied(true);
            alert("Coupon applied! You get 30% off.");
            console.log("Discounted Price:", totalPrice);
            // Storing discounted price in lastTotalPaid for final receipt
            // Updating totalPrice to reflect discount
        } else {
            alert("Invalid coupon code.");
            setCouponApplied(false);
        }
    };

    const handlePlaceOrder = async (e) => {
        // Prevent page refresh if called from a form
        e.preventDefault();
        
        try {
            setLastTotalPaid(totalPrice);
            // Simulation: We set the ordered state to true to show the receipt.
            // We do NOT clear the cart immediately, so we can render the items in the receipt.
            setIsOrdered(true);

            // Now clear the cart
            await clearCart(); 
            console.log("Order placed for:", address.fullName);
        } catch (error) {
            console.error("Order failed:", error);
        }
    };

    const returnToHome = () => {
        // This runs when user clicks "Return to Home" after seeing the receipt
        navigate('/');
    }

    // --- VIEW 1: SUCCESS RECEIPT ---
    if (isOrdered) {
        return (
            <div className="main-content-area">
                <div className="auth-form-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h2 style={{ color: 'var(--success)' }}>Order Confirmed!</h2>
                    <p className="auth-subtitle">Thank you for your purchase, {address.fullName}.</p>
                    
                    {/* Reusing existing profile styling for the receipt card */}
                    <div className="profile-card" style={{ boxShadow: 'none', border: '1px solid var(--border)', margin: '2rem 0' }}>
                        <div className="profile-content" style={{ padding: '1.5rem', textAlign: 'left' }}>
                            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '15px' }}>
                                Receipt
                            </h3>
                            
                            <p>
                                <strong>Shipping to:</strong><br/>
                                {address.street}, {address.city}, {address.state} - {address.pinCode}
                            </p>
                            
                            <div style={{ marginTop: '20px' }}>
                                {cartItems.map((item, index) => {
                                    const product = item.product || item;
                                    return (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                                            <span>{product.name} (x{item.quantity})</span>
                                            <span>₹{(product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="summary-row total" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '2px dashed var(--border)' }}>
                                <span>Total Paid:</span>
                                <span>₹{Number(lastTotalPaid).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="auth-submit-button" onClick={returnToHome}>
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    // --- VIEW 2: CHECKOUT FORM ---
    return (
        <div className="main-content-area">
             {/* Use cart-layout grid to put Form on left, Summary on right */}
            <div className="cart-layout">
                
                {/* Left: Shipping Form */}
                <div className="auth-form-container" style={{ margin: '0', maxWidth: '100%', textAlign: 'left' }}>
                    <h2>Shipping Details</h2>
                    <p className="auth-subtitle">Where should we deliver your order?</p>
                    
                    <form onSubmit={handlePlaceOrder}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input name="fullName" type="text" required onChange={handleInput} placeholder="Jane Doe" />
                        </div>
                        <div className="form-group">
                            <label>Street Address</label>
                            <input name="street" type="text" required onChange={handleInput} placeholder="123 Market St" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>City</label>
                                <input name="city" type="text" required onChange={handleInput} placeholder="Mumbai" />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input name="state" type="text" required onChange={handleInput} placeholder="Maharashtra" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Pin Code</label>
                            <input name="pinCode" type="text" required onChange={handleInput} placeholder="400001" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Coupon</label>
                                <input name="coupon" type="text" required placeholder="Enter Coupon code" />
                            </div>
                            <div className="form-group" style={{ alignSelf: 'end' }}>
                                <button 
                                    type="button"
                                    className="apply-coupon-button"
                                    onClick={applyCoupon}
                                >
                                    Apply Coupon
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="checkout-button">
                            Place Order (₹{totalPrice})
                        </button>
                    </form>
                </div>

                {/* Right: Sticky Summary */}
                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row" style={{ marginTop: '1rem' }}>
                        <span>Items:</span>
                        <span>{cartItems.length}</span>
                    </div>
                    {cartItems.map((item) => {
                         const product = item.product || item;
                         return (
                            <div key={product._id} className="summary-row" style={{fontSize: '0.85rem'}}>
                                <span style={{maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                    {item.quantity} x {product.name}
                                </span>
                                <span>₹{(item.quantity * product.price).toFixed(2)}</span>
                            </div>
                         )
                    })}
                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>₹{totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
