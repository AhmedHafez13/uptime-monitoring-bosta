import express from 'express';
import passport from 'passport';
import UrlController from '../controllers/urlController';

const router = express.Router();

// Custom middleware to handle unauthorized responses
const handleUnauthorized = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.isAuthenticated()) {
    console.log("print 222");
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    console.log("print 111");
    next(); // Continue to the next middleware/route
  }
};

// Apply JWT authentication middleware and custom unauthorized middleware to all URL routes
router.use(passport.authenticate('jwt', { session: false }));

// Create a URL check
router.post('/', UrlController.createUrl);

// Get URL check details
router.get('/:urlId', UrlController.getUrlDetails);

// Update URL check details
router.put('/:urlId', UrlController.updateUrl);

// Delete URL check
router.delete('/:urlId', UrlController.deleteUrl);

// Get all URL checks
router.get('/', UrlController.getAllUrls);

export default router;
