import express from 'express';
import UrlController from '../controllers/urlController';

const router = express.Router();

router.post('/create', UrlController.createUrl);
router.get('/:urlId', UrlController.getUrlDetails);

export default router;
