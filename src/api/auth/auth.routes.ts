import express from 'express';
import AuthController from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/verify-email', AuthController.verifyEmail);

export default router;
