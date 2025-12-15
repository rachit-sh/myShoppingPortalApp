import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js'; 

const getUserCart = async (userId) => {
    // Try to find the cart and populate the product details
    let cart = await Cart.findOne({ owner: userId }).populate('items.product');

    // If no cart exists, create a new empty one for the user
    if (!cart) {
        cart = await Cart.create({ owner: userId, items: [] });
    }
    return cart;
};

const getCart = async (req, res) => {
    try {
        const cart = await getUserCart(req.user._id);
        return res.status(200).json({ cart });

    } catch (error) {
        console.error("Error fetching cart:", error.message);
        return res.status(500).json({ message: "Server error while fetching cart." });
    }
};

const updateCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user._id;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required." });
        }
        
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found." });
        }

        const cart = await getUserCart(userId);
        const itemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
            if (cart.items[itemIndex].quantity <= 0) {
                 cart.items.splice(itemIndex, 1);
            }
        } else if (quantity > 0) {
            cart.items.push({ product: productId, quantity });
        }
        
        await cart.save();
        
        const updatedCart = await Cart.findById(cart._id).populate('items.product');

        return res.status(200).json({ 
            message: "Cart updated successfully",
            cart: updatedCart
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

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required." });
        }

        const cart = await getUserCart(userId);
        
        cart.items = cart.items.filter(item => item.product._id.toString() !== productId);
        
        await cart.save();
        
        const updatedCart = await Cart.findById(cart._id).populate('items.product');

        return res.status(200).json({ 
            message: "Item removed from cart successfully",
            cart: updatedCart
        });
        
    } catch (error) {
        console.error("Error removing item from cart:", error.message);
        return res.status(500).json({ message: "Server error while removing item." });
    }
};

export { getCart, updateCart, removeItemFromCart };
