import type { Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler.js';

export const uploadController = {
  async upload(req: Request, res: Response) {
    if (!req.file) throw new AppError(400, 'No file uploaded');

    const url = `/api/uploads/${req.file.filename}`;
    res.status(201).json({
      success: true,
      data: {
        filename: req.file.filename,
        url,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  },
};
