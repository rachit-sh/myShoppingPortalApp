import { Router } from 'express';

import { getAllProducts, createProduct, getProductById, updateProductById, deleteProductById } from '../controllers/product.controller.js';

const router = Router();

router.route('/').get(getAllProducts);
router.route('/new').post(createProduct);
router.route('/:id').get(getProductById);
router.route('/:id').put(updateProductById);
router.route('/:id').delete(deleteProductById);

export default router;