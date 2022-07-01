import express from 'express';
import { userLogin, userSignup } from '../controllers/authController.js';
import { validateLogin } from '../middlewares/validateLogin.js';
import { validateSignup } from '../middlewares/validateSignup.js';

const router = express.Router();

router.post("/login", validateLogin, userLogin );

router.post("/sign-up", validateSignup, userSignup);

export default router;