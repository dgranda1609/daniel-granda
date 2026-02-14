import type { Request, Response } from 'express';
import { projectModel } from '../models/projectModel.js';
import { createProjectSchema, updateProjectSchema } from '../validators/projectSchema.js';
import { slugify } from '../utils/slugify.js';
import { AppError } from '../middleware/errorHandler.js';

export const projectController = {
  async list(_req: Request, res: Response) {
    const projects = await projectModel.findVisible();
    res.json({ success: true, data: projects });
  },

  async listAll(_req: Request, res: Response) {
    const projects = await projectModel.findAll();
    res.json({ success: true, data: projects });
  },

  async getBySlug(req: Request, res: Response) {
    const project = await projectModel.findBySlug(req.params.slug);
    if (!project) throw new AppError(404, 'Project not found');
    res.json({ success: true, data: project });
  },

  async create(req: Request, res: Response) {
    const data = createProjectSchema.parse(req.body);
    const slug = data.slug || slugify(data.title);

    const existing = await projectModel.findBySlug(slug);
    if (existing) throw new AppError(409, 'A project with this slug already exists');

    const project = await projectModel.create({ ...data, slug });
    res.status(201).json({ success: true, data: project });
  },

  async update(req: Request, res: Response) {
    const data = updateProjectSchema.parse(req.body);
    if (data.slug) {
      const existing = await projectModel.findBySlug(data.slug);
      if (existing && existing.id !== req.params.id) {
        throw new AppError(409, 'A project with this slug already exists');
      }
    }

    const project = await projectModel.update(req.params.id, data);
    if (!project) throw new AppError(404, 'Project not found');
    res.json({ success: true, data: project });
  },

  async delete(req: Request, res: Response) {
    const deleted = await projectModel.delete(req.params.id);
    if (!deleted) throw new AppError(404, 'Project not found');
    res.json({ success: true, data: { deleted: true } });
  },
};
