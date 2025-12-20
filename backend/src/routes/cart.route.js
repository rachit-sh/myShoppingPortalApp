import { Router } from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import { 
    getCart,
    updateCart,
    removeItemFromCart,
    clearCart
} from '../controllers/cart.controller.js';

const router = Router();

// Apply middleware to ALL cart routes
router.use(verifyJWT); 

router.route('/')
    .get(getCart)          
    .post(updateCart)      
    .delete(removeItemFromCart);

router.route('/clear').delete(clearCart);

export default router;
