import express from 'express';
import passport from 'passport';
import UrlController from './url.controller';

const router = express.Router();

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
