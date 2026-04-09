import express from 'express';
import {
  getAppointments,
  createAppointment,
  cancelAppointment
} from '../controllers/appointmentController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getAppointments);
router.post('/', createAppointment);
router.delete('/:id', cancelAppointment);

export default router;
