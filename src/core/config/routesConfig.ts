import express from 'express';
import userRoutes from '../../api/users/user.routes';
import urlRoutes from '../../api/urls/url.routes';
import authRoutes from '../../api/auth/auth.routes';
import { NotFoundError } from '../middleware/errorHandler';
import { isAuthenticated } from '../middleware/authMiddleware';

class RoutesConfig {
  constructor(private app: express.Application) {
    this.configureRoutes();
  }

  private configureRoutes() {
    // API routes
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/urls', isAuthenticated, urlRoutes);
    this.app.use('/api/auth', authRoutes);

    // Home route [TODO: TEST/REMOVE]
    this.app.get('/api/', (req, res) => {
      res.json({ message: 'Hello, World!' });
    });

    // Catch-all route handler for 404 Not Found errors
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const error = new NotFoundError('Route not found');
        next(error);
      }
    );
  }
}

export default RoutesConfig;
