import { Request, Response } from 'express';
import UrlModel, { UrlAttributes } from '../models/urlModel';
import { UserDocument } from '../models/userModel';

class UrlController {
  private static async handleUrlOperation(
    req: Request,
    res: Response,
    operation: (data: UrlAttributes, userId: string) => Promise<any>
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' }); // TODO: TRANS
      }

      const userId = (<UserDocument>req.user)._id.toString();
      const {
        name,
        url,
        protocol,
        path,
        port,
        webhook,
        timeout,
        interval,
        threshold,
        authentication,
        httpHeaders,
        assert,
        tags,
        ignoreSSL,
      }: UrlAttributes = req.body;

      // Validate required fields
      if (!url || !protocol || !name) {
        return res.status(400).json({ error: 'URL, protocol, and name are required fields' }); // TODO: TRANS
      }

      const newData: UrlAttributes = {
        name,
        url,
        protocol,
        path,
        port,
        webhook,
        timeout,
        interval,
        threshold,
        authentication,
        httpHeaders,
        assert,
        tags,
        ignoreSSL,
        user: userId,
      };

      const result = await operation(newData, userId);
      if (!result) {
        return;
      }

      res.status(201).json({ message: 'Operation completed successfully', url: result }); // TODO: TRANS
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during the operation, ' + error.message }); // TODO: TRANS
    }
  }

  async createUrl(req: Request, res: Response) {
    await UrlController.handleUrlOperation(req, res, async (data) => {
      return await UrlModel.create(data);
    });
  }

  async updateUrl(req: Request, res: Response) {
    await UrlController.handleUrlOperation(
      req,
      res,
      async (data, userId: String): Promise<UrlAttributes | null> => {
        const urlId = req.params.urlId;

        // Find the URL in the database
        const urlDetails = await UrlModel.findById(urlId);
        if (!urlDetails) {
          res.status(404).json({ error: 'URL details not found' }); // TODO: TRANS
          return null;
        }
        // Check if the URL belongs to the authenticated user
        if (urlDetails.user.toString() !== userId) {
          res.status(403).json({ error: 'Forbidden' }); // TODO: TRANS
          return null;
        }

        // Perform update
        const updatedUrl = await UrlModel.findByIdAndUpdate(urlId, data, { new: true });

        return updatedUrl;
      }
    );
  }

  async getUrlDetails(req: Request, res: Response) {
    try {
      const urlId = req.params.urlId;
      const userId = (<UserDocument>req.user)._id.toString();

      const urlDetails = await UrlModel.findById(urlId);
      if (!urlDetails) {
        return res.status(404).json({ error: 'URL details not found' }); // TODO: TRANS
      }
      // Check if the URL belongs to the authenticated user
      if (urlDetails.user.toString() !== userId) {
        return res.status(403).json({ error: 'Forbidden' }); // TODO: TRANS
      }

      res.json({ urlDetails });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching URL details' }); // TODO: TRANS
    }
  }

  async deleteUrl(req: Request, res: Response) {
    try {
      const urlId = req.params.urlId;
      const userId = (<UserDocument>req.user)._id.toString();

      const urlDetails = await UrlModel.findById(urlId);
      if (!urlDetails) {
        return res.status(404).json({ error: 'URL details not found' }); // TODO: TRANS
      }
      // Check if the URL belongs to the authenticated user
      if (urlDetails.user.toString() !== userId) {
        return res.status(403).json({ error: 'Forbidden' }); // TODO: TRANS
      }

      const deletedUrl = await UrlModel.findByIdAndDelete(urlId);

      if (!deletedUrl) {
        res.status(404).json({ error: 'URL details not found' }); // TODO: TRANS
        return;
      }

      res.json({ message: 'URL deleted successfully' }); // TODO: TRANS
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting URL' }); // TODO: TRANS
    }
  }

  async getAllUrls(req: Request, res: Response) {
    try {
      const userId = (<UserDocument>req.user)._id.toString();

      const allUrls = await UrlModel.find({ user: userId });

      res.json({ urls: allUrls });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching URLs' }); // TODO: TRANS
    }
  }
}

export default new UrlController();
