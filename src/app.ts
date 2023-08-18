import express from 'express';
import passport from 'passport';
import connectToDatabase from './config/dbConfig';
import RoutesConfig from './config/routesConfig';
import PassportConfig from './config/passportConfig';
import { config } from 'dotenv';
import { errorHandler } from './middleware/errorHandler';

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

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
