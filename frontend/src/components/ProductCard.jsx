import React from 'react';
/*
React is greyed out because it's imported but not directly used in the code.
However, it's necessary for JSX to work.
If we were using React 17 or earlier, this import would be essential.
In React 18 and later, it's still a good practice to include it for clarity.
*/

// The component accepts 'props' (properties) passed from its parent.
// We use object destructuring { product } to immediately access the 'product' object.
const ProductCard = ({ product, onAddToCart }) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    // Destructure the product properties for cleaner JSX
    const { name, description, price, category, stock, imageUrl } = product;

    // Function to handle button click
    const handleButtonClick = () => {
        if (onAddToCart) {
            onAddToCart(product);
            console.log(`Added ${product.name} to cart!`);
        }
    };

    return (
        <div className="product-card">
            <img src={imageUrl || 'placeholder.jpg'} alt={name} className="product-image" />

            <div className="product-details">
                <h2 className="product-name">{name}</h2>
                <p className="product-description">{description && description.substring(0, 50) + '...'}</p>
                {/*
                Here, using description.substring(0, 50) to limit description length.
                It means showing only first 50 characters of description.
                The rest will be truncated with '...'
                */}
                <p className="product-price">${price ? price.toFixed(2) : 'N/A'}</p>
                <p className="product-category">Category: {category}</p>
                <p className="product-stock">In Stock: {stock}</p>

                <button className="add-to-cart-button" onClick={handleButtonClick}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
