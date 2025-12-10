import React from 'react';

// The component receives the cart items array as a prop
const Cart = ({ items }) => {
  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    // items.reduce is a powerful array method for calculating a single value (the sum)
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0); // Start the accumulator (total) at 0
  };

  return (
    <div className="cart-container">
      <h3>🛍️ Shopping Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty. Start adding some products!</p>
      ) : (
        <>  {/* Fragment to group multiple elements. */}
          <ul className="cart-list">
            {items.map(item => (
              <li key={item._id} className="cart-item">
                <div className="item-details">
                  {/* Display item name and quantity */}
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">Qty: **{item.quantity}**</span>
                </div>

                {/* Display item subtotal */}
                <span className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <hr />
            <h4>
              Total: **${calculateTotal().toFixed(2)}**
            </h4>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
