import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // We must use the 'withCredentials' option to send the auth cookie
            await axios.post('http://localhost:4000/api/v1/products', formData, {
                withCredentials: true 
            });
            
            alert("Product Created Successfully!");
            navigate('/'); // Redirect to home to see the new product
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content-area">
            <div className="auth-form-container create-product-container">
                <h2>Create New Product</h2>
                <p className="auth-subtitle">Add a new item to the store inventory.</p>

                {error && <div className="form-message error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input name="name" type="text" required onChange={handleChange} placeholder="e.g. Wireless Mouse" />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            name="description" 
                            required 
                            onChange={handleChange} 
                            placeholder="Product details..."
                            className="form-textarea" // New class for styling
                        />
                    </div>

                    <div className="form-grid-2"> {/* New class for 2-column layout */}
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input name="price" type="number" min="0" required onChange={handleChange} placeholder="999" />
                        </div>
                        <div className="form-group">
                            <label>Stock Quantity</label>
                            <input name="stock" type="number" min="0" required onChange={handleChange} placeholder="50" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input name="category" type="text" required onChange={handleChange} placeholder="Electronics" />
                    </div>

                    <div className="form-group">
                        <label>Image URL (Optional)</label>
                        <input name="imageUrl" type="url" onChange={handleChange} placeholder="https://example.com/image.jpg" />
                    </div>

                    <button type="submit" className="auth-submit-button" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
