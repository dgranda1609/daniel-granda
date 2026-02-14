import type { Request, Response } from 'express';
import { testimonialModel } from '../models/testimonialModel.js';
import { createTestimonialSchema, updateTestimonialSchema } from '../validators/testimonialSchema.js';
import { AppError } from '../middleware/errorHandler.js';

export const testimonialController = {
  async list(_req: Request, res: Response) {
    const testimonials = await testimonialModel.findFeatured();
    res.json({ success: true, data: testimonials });
  },

  async listAll(_req: Request, res: Response) {
    const testimonials = await testimonialModel.findAll();
    res.json({ success: true, data: testimonials });
  },

  async create(req: Request, res: Response) {
    const data = createTestimonialSchema.parse(req.body);
    const testimonial = await testimonialModel.create(data);
    res.status(201).json({ success: true, data: testimonial });
  },

  async update(req: Request, res: Response) {
    const data = updateTestimonialSchema.parse(req.body);
    const testimonial = await testimonialModel.update(req.params.id, data);
    if (!testimonial) throw new AppError(404, 'Testimonial not found');
    res.json({ success: true, data: testimonial });
  },

  async delete(req: Request, res: Response) {
    const deleted = await testimonialModel.delete(req.params.id);
    if (!deleted) throw new AppError(404, 'Testimonial not found');
    res.json({ success: true, data: { deleted: true } });
  },
};
