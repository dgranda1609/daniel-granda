import type { Request, Response } from 'express';
import { clientModel } from '../models/clientModel.js';
import { createClientSchema, updateClientSchema } from '../validators/clientSchema.js';
import { AppError } from '../middleware/errorHandler.js';

export const clientController = {
  async list(_req: Request, res: Response) {
    const clients = await clientModel.findFeatured();
    res.json({ success: true, data: clients });
  },

  async listAll(_req: Request, res: Response) {
    const clients = await clientModel.findAll();
    res.json({ success: true, data: clients });
  },

  async create(req: Request, res: Response) {
    const data = createClientSchema.parse(req.body);
    const client = await clientModel.create(data);
    res.status(201).json({ success: true, data: client });
  },

  async update(req: Request, res: Response) {
    const data = updateClientSchema.parse(req.body);
    const client = await clientModel.update(req.params.id, data);
    if (!client) throw new AppError(404, 'Client not found');
    res.json({ success: true, data: client });
  },

  async delete(req: Request, res: Response) {
    const deleted = await clientModel.delete(req.params.id);
    if (!deleted) throw new AppError(404, 'Client not found');
    res.json({ success: true, data: { deleted: true } });
  },
};
