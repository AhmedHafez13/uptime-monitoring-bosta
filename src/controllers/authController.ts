import { Request, Response } from 'express';
import UserModel, { UserDocument } from '../models/userModel';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const newUser = new UserModel(req.body);

      const validationError = newUser.validateSync();
      if (validationError) {
        const errors = Object.keys(validationError.errors).map((field) => {
          return {
            field,
            message: validationError.errors[field].message, // TODO: TRANS
          };
        });
        return res.status(400).json({ errors });
      }

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: newUser }); // TODO: TRANS
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during signup' }); // TODO: TRANS
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' }); // TODO: TRANS
      }
  
      passport.authenticate('local', { session: false }, async (err, user: UserDocument, info) => {
        if (err) {
          return res.status(500).json({ error: 'An error occurred during login' }); // TODO: TRANS
        }
  
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' }); // TODO: TRANS
        }
  
        try {
          const isPasswordValid = await user.comparePassword(password);
          if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' }); // TODO: TRANS
          }
  
          req.login(user, { session: false }, (error) => {
            if (error) {
              return res.status(500).json({ error: 'An error occurred during login' }); // TODO: TRANS
            }
  
            const token = jwt.sign({ sub: user._id }, JWT_SECRET);
            res.json({ user, token });
          });
        } catch (error) {
          return res.status(500).json({ error: 'An error occurred during login' }); // TODO: TRANS
        }
      })(req, res);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' }); // TODO: TRANS
    }
  }
}

export default new AuthController();