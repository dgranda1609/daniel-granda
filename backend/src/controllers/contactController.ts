import type { Request, Response } from 'express';
import { contactModel } from '../models/contactModel.js';
import { contactSubmitSchema } from '../validators/contactSchema.js';
import { parsePagination, paginationMeta } from '../utils/pagination.js';
import { sendContactNotification } from '../services/emailService.js';
import { AppError } from '../middleware/errorHandler.js';

export const contactController = {
  // Public: submit contact form
  async submit(req: Request, res: Response) {
    const data = contactSubmitSchema.parse(req.body);
    const submission = await contactModel.create(data);

    // Send email notification (non-blocking)
    sendContactNotification(data).catch((err) => {
      console.error('Failed to send contact notification:', err);
    });

    res.status(201).json({ success: true, data: { id: submission.id, message: 'Message sent successfully' } });
  },

  // Admin: list submissions
  async list(req: Request, res: Response) {
    const { page, limit, offset } = parsePagination(req.query as { page?: string; limit?: string });
    const { rows, total } = await contactModel.findAll(limit, offset);
    res.json({
      success: true,
      data: rows,
      meta: paginationMeta(total, { page, limit, offset }),
    });
  },

  // Admin: mark as read
  async markRead(req: Request, res: Response) {
    const submission = await contactModel.markRead(req.params.id);
    if (!submission) throw new AppError(404, 'Submission not found');
    res.json({ success: true, data: submission });
  },

  // Admin: delete submission
  async delete(req: Request, res: Response) {
    const deleted = await contactModel.delete(req.params.id);
    if (!deleted) throw new AppError(404, 'Submission not found');
    res.json({ success: true, data: { deleted: true } });
  },
};
