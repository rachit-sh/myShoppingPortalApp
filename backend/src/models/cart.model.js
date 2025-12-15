import mongoose, { Schema } from 'mongoose';

const CartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to existing Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
}, { _id: false }); 

const cartSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
        unique: true 
    },
    items: {
        type: [CartItemSchema], 
        default: []
    }
}, {
    timestamps: true
});

export const Cart = mongoose.model('Cart', cartSchema);
