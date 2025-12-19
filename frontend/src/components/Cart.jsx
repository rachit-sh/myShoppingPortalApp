import React from 'react';

// The component receives the cart items array and handler functions as props
const Cart = ({ items, onRemove, onDecrease, onAdd }) => {

 // Calculate the total price of all items in the cart
 const calculateTotal = () => {
  // items.reduce is a powerful array method for calculating a single value (the sum)
  return items.reduce((total, item) => {
   // Note: If your backend populates the product, the data is inside item.product
   const price = item.product?.price || item.price || 0;
   return total + price * item.quantity;
  }, 0); // Start the accumulator (total) at 0
 };

 const totalPrice = calculateTotal().toFixed(2);

 return (
  <div className="cart-container">
   <h2>🛍️ Your Shopping Cart</h2>

   {items.length === 0 ? (
    <div className="empty-cart-message">
     <p>Your cart is empty. Start adding some products!</p>
    </div>
   ) : (
    /* The cart-layout uses a CSS Grid to separate items from the summary dashboard */
    <div className="cart-layout">

     {/* Left Column: The scrollable list of products in the cart */}
     <div className="cart-items-list">
      {items.map((item) => {
       // Helper to handle both flat objects and nested product models
       const product = item.product || item;

       return (
        <div key={product._id} className="cart-item">
         {/* Display Product Image: Enhances visual recognition */}
         <img 
          src={product.imageUrl || 'https://via.placeholder.com/80'} 
          alt={product.name} 
         />

         <div className="cart-item-info">
          {/* Display item name */}
          <p className="cart-item-name">{product.name}</p>
          {/* Display individual item price */}
          <p className="cart-item-price">${product.price?.toFixed(2)}</p>
         </div>

         {/* Quantity controls: Uses the styled control group from index.css */}
         <div className="cart-item-controls">
          {/* Decrease Button: Uses onDecrease prop function */}
          <button onClick={() => onDecrease(product._id)}>−</button>

          <span className="item-qty">**{item.quantity}**</span>

          {/* Increase Button: Uses onAdd prop function */}
          <button onClick={() => onAdd(product)}>+</button>
         </div>

         {/* Remove Button: Styled as a danger/delete action */}
         <button 
          className="remove-item-button" 
          onClick={() => onRemove(product._id)}
         >
          Remove
         </button>
        </div>
       );
      })}
     </div>

     {/* Right Column: The Order Summary Card (Stays visible while scrolling) */}
     <div className="cart-summary">
      <h3>Order Summary</h3>
      
      {/* Row for Subtotal calculation */}
      <div className="summary-row">
       <span>Subtotal</span>
       <span>${totalPrice}</span>
      </div>

      {/* Row for Shipping info (Mocked as free for this version) */}
      <div className="summary-row">
       <span>Shipping</span>
       <span>Free</span>
      </div>

      {/* Final calculation row using the 'total' class for emphasis */}
      <div className="summary-row total">
       <span>Total</span>
       <span>${totalPrice}</span>
      </div>

      <button className="checkout-button">Proceed to Checkout</button>
     </div>

    </div>
   )}
  </div>
 );
};

export default Cart;
