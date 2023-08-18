import express from 'express';
import { config } from 'dotenv';
import connectToDatabase from './dbConfig';
import configureRoutes from './routesConfig';
import { errorHandler } from './middleware/errorHandler';

config();
const app = express();

// Connect to the database
connectToDatabase();

// Middleware
app.use(express.json());

// Routes
configureRoutes(app);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
