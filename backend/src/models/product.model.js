import mongoose from "mongoose";

// Using mongoose.Schema to define the structure of Product documents
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxLength: 100
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxLength: 1000
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxLength: 50
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        imageUrl: {
            type: String,
            required: false,
            trim: true
        }
    }, {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema);
