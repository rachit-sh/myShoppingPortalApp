import { Router } from 'express';

import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
} from '../controllers/product.controller.js';

const router = Router();

router.route('/')
    .get(getAllProducts)
    .post(createProduct);

    router.route('/:id')
    .get(getProductById)
    .put(updateProductById)
    .delete(deleteProductById);

export default router;
