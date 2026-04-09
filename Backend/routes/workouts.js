import express from 'express';
import {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected workout routes
router.use(requireAuth);

// READ routes
router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);

// CREATE routes
router.post('/', createWorkout);

// UPDATE routes
router.patch('/:id', updateWorkout);

// DELETE routes
router.delete('/:id', deleteWorkout);

export default router;
