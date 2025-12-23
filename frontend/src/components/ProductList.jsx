import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import { Link } from 'react-router-dom'; // To link to Create Product
import { useAuth } from '../context/useAuth.js'; // To check if user is logged in

const ProductList = () => {
    // STATE: products is where the data will be stored.
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search State
    const [searchTerm, setSearchTerm] = useState("");
    const { currentUser } = useAuth();

    // DEFINE FETCH LOGIC OUTSIDE useEffect
    // We define this here so it can be called by both useEffect (on load) and handleSearch (on button click)
    const fetchProducts = async (query = "") => {
        setLoading(true);
        try {
            // Append search query parameter. If query is empty, backend returns all products.
            const response = await axios.get(`http://localhost:4000/api/v1/products?search=${query}`);
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError(`Error fetching products: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // INITIAL LOAD
    // Runs once when component mounts. Calls fetchProducts with empty string -> returns all featured products.
    useEffect(() => {
        fetchProducts(); 
    }, []);

    // SEARCH HANDLER
    const handleSearch = (e) => {
        e.preventDefault(); // Stop form refresh
        fetchProducts(searchTerm);
    };

    // RENDER: Display the data.
    if (loading) {
        return <div>Loading products...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="product-list-container">
            {/* Header Section: Title + Create Button */}
            <div className="list-header">
                <h2>Featured Products</h2>
                
                {/* Only show "Add Product" button if logged in */}
                {currentUser && (
                    <Link to="/create-product">
                        <button className="create-product-btn">
                            + Add New Product
                        </button>
                    </Link>
                )}
            </div>

            {/* Search Bar Section */}
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Search by name or category..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>

            {/* Products Grid */}
            <div className="products-grid"> 
                {products.length === 0 ? (
                    <div className="no-products-msg">
                        <p>No products found matching "{searchTerm}".</p>
                        {/* Helper link to reset view if search yielded no results */}
                        {searchTerm && (
                            <button 
                                className="reset-search-btn"
                                onClick={() => {
                                    setSearchTerm("");
                                    fetchProducts("");
                                }}
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
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
