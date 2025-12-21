import React from 'react';
/*
React is greyed out because it's imported but not directly used in the code.
However, it's necessary for JSX to work.
If we were using React 17 or earlier, this import would be essential.
In React 18 and later, it's still a good practice to include it for clarity.
*/
import { useCart } from '../context/useCart.js';
import { useAuth } from '../context/useAuth.js';

// The component accepts 'props' (properties) passed from its parent.
// We use object destructuring { product } to immediately access the 'product' object.
const ProductCard = ({ product }) => {
    const { addToCart, decreaseQuantity, cartItems } = useCart();
    const { currentUser } = useAuth();

    if (!product) {
        return <div>Loading...</div>;
    }

    // Destructure the product properties for cleaner JSX
    const { _id, name, description, price, category, stock, imageUrl } = product;

    // Check if this specific product is already in the cart
    const cartItem = cartItems.find(item => item._id === _id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    // Function to handle button click
    const handleButtonClick = () => {
        if (currentUser) {
            addToCart(product);
            console.log(`Added ${product.name} to cart!`);
        } else {
            alert("Please login to add items to cart.");
        }
    };

    return (
        <div className="product-card">
            <img src={imageUrl || 'placeholder.jpg'} alt={name} className="product-image" />

            <div className="product-details">
                <h2 className="product-name">{name}</h2>
                <p className="product-description">
                    {description && description.substring(0, 50) + '...' || 'Product Description...'}
                </p>
                {/*
                Here, using description.substring(0, 50) to limit description length.
                It means showing only first 50 characters of description.
                The rest will be truncated with '...'
                */}
                <p className="product-price">₹{price ? price.toFixed(2) : 'N/A'}</p>
                <p className="product-category">Category: {category}</p>
                <p className="product-stock">In Stock: {stock}</p>

                {/* Conditional Rendering for Button: Toggle between "Add to Cart" and the "+/- Controls" */}
                {quantityInCart > 0 ? (
                    <div className="card-qty-controls">
                        {/* Decrease Button */}
                        <button 
                            onClick={(e) => {
                                e.preventDefault(); // Stop any parent click events
                                decreaseQuantity(_id);
                            }}
                        >
                            -
                        </button>
                        
                        {/* Quantity Text */}
                        <span className="card-qty-text">
                            In Cart: {quantityInCart}
                        </span>
                        
                        {/* Increase Button */}
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                            }}
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        className="add-to-cart-button"
                        onClick={handleButtonClick}
                        disabled={!currentUser}
                    >
                        {currentUser ? 'Add to Cart' : 'Login to Add'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
