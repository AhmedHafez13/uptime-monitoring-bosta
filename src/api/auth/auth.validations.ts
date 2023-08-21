import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../users/user.model';

class AuthValidator {
  private static signupValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate the request body against the signup schema
      const { error, value } = AuthValidator.signupValidationSchema.validate(
        req.body
      );
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      // Check if the email is already in use
      const emailInUse = await AuthValidator.checkIfEmailExists(value.email);
      if (emailInUse) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      // If validation passes, attach the valid data to the request object
      req.body = value;
      next();
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred during validation,' + error });
    }
  }

  private static async checkIfEmailExists(email: string): Promise<boolean> {
    try {
      const existingUser = await UserModel.findOne({ email });
      return Boolean(existingUser);
    } catch (error) {
      console.error('Error checking if email exists:', error);
      return false;
    }
  }
}

export default AuthValidator;
