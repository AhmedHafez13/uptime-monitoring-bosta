import express from 'express';
import passport from 'passport';
import connectToDatabase from './core/config/dbConfig';
import RoutesConfig from './core/config/routesConfig';
import PassportConfig from './core/config/passportConfig';
import { config } from 'dotenv';
import { errorHandler } from './core/middleware/errorHandler';
import NotificationsConfig from './core/config/notificationsConfig';

config();
const app = express();

// Connect to the database
connectToDatabase();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Initialize Passport configuration
new PassportConfig();

// Configure routes
new RoutesConfig(app);

// Configure Notification Channels
new NotificationsConfig();

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
