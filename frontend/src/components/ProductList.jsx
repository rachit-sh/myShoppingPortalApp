import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';

const ProductList = () => {
    // 1. STATE: products is where the data will be stored.
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. useEffect: Run code once when the component mounts (loads).
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 3. FETCH: Use your backend's URL.
                const response = await axios.get('http://localhost:4000/api/v1/products');

                // 4. UPDATE STATE: Store the data in the products state variable.
                setProducts(response.data);
            } catch (err) {
                setError(`Error fetching products: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();    // The empty array [] ensures this runs only once.
    }, []);

    // 5. RENDER: Display the data.
    if (loading) {
        return <div>Loading products...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="product-list-container">
            <h2>Featured Products</h2>
            <div className="products-grid"> {/* Using a grid layout for cards */}
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
