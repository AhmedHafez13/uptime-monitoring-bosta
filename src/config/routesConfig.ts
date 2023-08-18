import express from 'express';
import userRoutes from '../routes/userRoutes';
import urlRoutes from '../routes/urlRoutes';
import { NotFoundError } from '../middleware/errorHandler';

const configureRoutes = (app: express.Application) => {
  // API routes
  app.use('/api/users', userRoutes);
  app.use('/api/urls', urlRoutes);

  // Home route [TODO: TEST/REMOVE]
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // Catch-all route handler for 404 Not Found errors
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = new NotFoundError('Route not found'); // TODO: TRANS
    next(error);
  });
};

export default configureRoutes;
