import { Product } from '../models/product.model.js';

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        // Basic validation
        if (!name || !description || !price || !category || stock == null) {
            return res.status(400).json({ message: 'All fields except imageUrl are required' });
        }

        // Check for valid price and stock
        if (price < 0 || stock < 0) {
            return res.status(400).json({ message: 'Price and stock must be non-negative' });
        }

        // Check for existing product with the same name
        const existingProduct = await Product.findOne({ name: name.trim() });
        if (existingProduct) {
            return res.status(409).json({ message: 'Product with this name already exists' });
        }

        // Create and save the new product
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error(`Error creating product: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products (With Pagination)
export const getAllProducts = async (req, res) => {
    try {
        // Parse query params, default to Page 1, Limit 35
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 35;
        const skip = (page - 1) * limit;

        // 1. Extract search term
        const search = req.query.search || "";

        // 2. Build Query Object
        // If search exists, find products where name OR category matches (case-insensitive)
        const query = search ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ]
        } : {};

        const products = await Product.find(query)
            .sort({ createdAt: -1 }) // Show newest products first
            .skip(skip)
            .limit(limit);

        // Return total count for frontend pagination logic
        const total = await Product.countDocuments(query);

        res.status(200).json(products);
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error fetching product: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product by ID
export const updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error(`Error updating product: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product by ID
export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(`Error deleting product: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};
