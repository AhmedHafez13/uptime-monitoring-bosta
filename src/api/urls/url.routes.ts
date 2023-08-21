import express from 'express';
import UrlController from './url.controller';

const router = express.Router();

router.post('/', UrlController.createUrl);
router.get('/:urlId', UrlController.getUrlDetails);
router.put('/:urlId', UrlController.updateUrl);
router.delete('/:urlId', UrlController.deleteUrl);
router.get('/', UrlController.getAllUrls);

export default router;
