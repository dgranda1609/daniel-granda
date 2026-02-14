import type { Request, Response } from 'express';
import { settingsModel } from '../models/settingsModel.js';
import { updateSettingsSchema } from '../validators/settingsSchema.js';

export const settingsController = {
  // Public: get all settings
  async getPublic(_req: Request, res: Response) {
    const settings = await settingsModel.getAll();
    res.json({ success: true, data: settings });
  },

  // Admin: update settings
  async update(req: Request, res: Response) {
    const data = updateSettingsSchema.parse(req.body);
    await settingsModel.updateMany(data);
    const settings = await settingsModel.getAll();
    res.json({ success: true, data: settings });
  },
};
