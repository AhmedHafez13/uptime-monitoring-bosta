import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { VerificationTokenData } from './auth.types';
import UserModel, { UserDocument } from '../users/user.model';
import { jwtConfig } from '../../core/config/jwtConfig';
import EmailService from '../../core/services/email.service';

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

      // Generate an email verification token
      const userData: VerificationTokenData = { userId: newUser._id };
      const verificationToken = jwt.sign(userData, jwtConfig.secretKey, {
        expiresIn: jwtConfig.emailVerificationExpiration,
      });

      // Send the verification email with the token
      EmailService.sendVerificationEmail(newUser.email, verificationToken);

      res
        .status(201)
        .json({ message: 'User registered successfully', verificationToken }); // TODO: TRANS
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred during signup,' + error }); // TODO: TRANS
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: 'Email and password are required' }); // TODO: TRANS
      }

      passport.authenticate(
        'local',
        { session: false },
        async (err, user: UserDocument) => {
          if (err) {
            return res
              .status(500)
              .json({ error: 'An error occurred during login' }); // TODO: TRANS
          }

          if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' }); // TODO: TRANS
          }

          if (!user.isEmailVerified) {
            return res.status(403).json({ error: 'Email is not verified' }); // TODO: TRANS
          }

          try {
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
              return res
                .status(401)
                .json({ error: 'Invalid email or password' }); // TODO: TRANS
            }

            req.login(user, { session: false }, (error) => {
              if (error) {
                return res
                  .status(500)
                  .json({ error: 'An error occurred during login,' + error }); // TODO: TRANS
              }

              const token = jwt.sign({ sub: user._id }, jwtConfig.secretKey, {
                expiresIn: jwtConfig.authTokenExpiration,
              });
              res.json({ user, token });
            });
          } catch (error) {
            return res
              .status(500)
              .json({ error: 'An error occurred during login,' + error }); // TODO: TRANS
          }
        }
      )(req, res);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred during login,' + error }); // TODO: TRANS
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;

      if (!token) {
        return res
          .status(400)
          .json({ error: 'Verification token is required' }); // TODO: TRANS
      }

      try {
        const decodedToken = jwt.verify(
          token.toString(),
          jwtConfig.secretKey
        ) as VerificationTokenData;

        if (!decodedToken.userId) {
          return res
            .status(400)
            .json({ error: 'Invalid verification token format' }); // TODO: TRANS
        }

        // Find the user by userId
        const user = await UserModel.findById(decodedToken.userId);

        if (!user) {
          return res.status(404).json({ error: 'User not found' }); // TODO: TRANS
        }

        // Mark the user's email as verified
        user.isEmailVerified = true;
        await user.save();

        return res.json({ message: 'Email verification successful' }); // TODO: TRANS
      } catch (error) {
        return res.status(400).json({ error: 'Invalid verification token' }); // TODO: TRANS
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'An error occurred during email verification' }); // TODO: TRANS
    }
  }
}

export default new AuthController();
