import express from 'express';
import AuthController from './auth.controller';
import AuthValidator from './auth.validations';

const router = express.Router();

router.post('/signup', AuthValidator.signup, AuthController.signup);
router.post('/login', AuthController.login);
router.post('/verify-email', AuthController.verifyEmail);

export default router;
