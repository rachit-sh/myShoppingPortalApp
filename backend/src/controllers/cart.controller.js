import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js'; 

const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        // Find cart or create if not exists (using upsert logic effectively)
        let cart = await Cart.findOne({ owner: userId }).populate('items.product');
        
        if (!cart) {
            cart = await Cart.create({ owner: userId, items: [] });
        }
        return res.status(200).json({ cart });

    } catch (error) {
        console.error("Error fetching cart:", error.message);
        return res.status(500).json({ message: "Server error while fetching cart." });
    }
};

// Update Cart (Atomic & Concurrency Safe)
const updateCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user._id;

        // Validation
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found." });
        }

        // A. Try to update existing item quantity atomically
        // "$inc" increments the value. If quantity is -1, it decreases.
        let cart = await Cart.findOneAndUpdate(
            { owner: userId, "items.product": productId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true } // Return updated doc
        ).populate('items.product');

        // B. If product was NOT in cart, push it as a new item
        if (!cart) {
            cart = await Cart.findOneAndUpdate(
                { owner: userId },
                { $push: { items: { product: productId, quantity: quantity } } },
                { new: true, upsert: true } // Create cart if it doesn't exist
            ).populate('items.product');
        }

        // C. Cleanup: Remove items with 0 or negative quantity
        // This cleans up the array in one go after the update
        const hasInvalidItems = cart.items.some(item => item.quantity <= 0);
        if (hasInvalidItems) {
            cart = await Cart.findOneAndUpdate(
                { owner: userId },
                { $pull: { items: { quantity: { $lte: 0 } } } },
                { new: true }
            ).populate('items.product');
        }

        return res.status(200).json({ 
            message: "Cart updated successfully",
            cart: cart
        });

    } catch (error) {
        console.error("Error updating cart:", error.message);
        return res.status(500).json({ message: "Server error while updating cart." });
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const cart = await Cart.findOneAndUpdate(
            { owner: userId },
            { $pull: { items: { product: productId } } },
            { new: true }
        ).populate('items.product');

        return res.status(200).json({ 
            message: "Item removed successfully",
            cart: cart
        });
        
    } catch (error) {
        console.error("Error removing item from cart:", error.message);
        return res.status(500).json({ message: "Server error while removing item." });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Set items array to empty
        await Cart.findOneAndUpdate(
            { owner: userId },
            { $set: { items: [] } }
        );

        return res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error.message);
        return res.status(500).json({ message: "Server error." });
    }
};

export { getCart, updateCart, removeItemFromCart, clearCart };
