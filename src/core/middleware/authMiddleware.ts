import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

// Middleware function to check if user is authenticated
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    return next();
  })(req, res);
};
