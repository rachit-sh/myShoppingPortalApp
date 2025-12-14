import { Router } from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';

import { signupUser, loginUser, logoutUser, getCurrentUser } from '../controllers/user.controller.js';

const router = Router();

// Public Routes (No auth required)
router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);

// Private Routes (Uses the verifyJWT middleware)
router.route('/current-user').get(verifyJWT, getCurrentUser); // Protected route
router.route('/logout').post(verifyJWT, logoutUser);

export default router;
