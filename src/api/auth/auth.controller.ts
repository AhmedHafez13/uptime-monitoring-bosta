import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import EmailVerificationModel from './email-verification.model';
import UserModel, { UserDocument } from '../users/user.model';
import { jwtConfig } from '../../core/config/jwtConfig';
import EmailService from '../../core/services/email.service';

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      // TODO: handle validations (username, email, password)

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
      const verificationToken = jwt.sign(
        { sub: newUser._id },
        jwtConfig.secretKey,
        {
          expiresIn: jwtConfig.verificationTokenExpireTime,
        }
      );

      // Save the email verification record
      const emailVerificationRecord = new EmailVerificationModel({
        userId: newUser._id,
        token: verificationToken,
      });
      await emailVerificationRecord.save();

      // Send the verification email with the token
      EmailService.sendVerificationEmail(newUser.email, verificationToken);

      res
        .status(201)
        .json({ message: 'User registered successfully', verificationToken });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during signup' });
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
            return res.status(403).json({ error: 'Email is not verified' });
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
                  .json({ error: 'An error occurred during login' }); // TODO: TRANS
              }

              const token = jwt.sign({ sub: user._id }, jwtConfig.secretKey, {
                expiresIn: jwtConfig.authTokenExpireTime,
              });
              res.json({ user, token });
            });
          } catch (error) {
            return res
              .status(500)
              .json({ error: 'An error occurred during login' }); // TODO: TRANS
          }
        }
      )(req, res);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' }); // TODO: TRANS
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ error: 'Verification token is required' });
      }

      // Find the email verification record by token
      const verificationRecord = await EmailVerificationModel.findOne({
        token,
      });

      if (!verificationRecord) {
        return res.status(404).json({ error: 'Invalid verification token' });
      }

      // Find the user associated with the verification record
      const user = await UserModel.findById(verificationRecord.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Mark the user's email as verified
      user.isEmailVerified = true;
      await user.save();

      // Delete the email verification record
      await verificationRecord.deleteOne();

      return res.json({ message: 'Email verification successful' });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred during email verification' });
    }
  }
}

export default new AuthController();
