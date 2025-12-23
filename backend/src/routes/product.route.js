import { Router } from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';

import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
} from '../controllers/product.controller.js';

const router = Router();

// Public: Everyone can view products
router.route('/').get(getAllProducts);

// Protected: Only logged-in users can create products
router.route('/').post(verifyJWT, createProduct); 

// For ID routes, you might also want to protect update/delete
router.route('/:id')
    .get(getProductById)
    .put(verifyJWT, updateProductById)   // Protected
    .delete(verifyJWT, deleteProductById); // Protected

export default router;
