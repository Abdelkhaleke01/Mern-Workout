import Workout from '../models/Workout.js';
import mongoose from 'mongoose';

// ===== READ CONTROLLERS =====

// GET all workouts
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};

// GET single workout by ID
export const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validatie: Is het een geldig MongoDB ObjectId?
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Ongeldig workout ID formaat'
      });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout niet gevonden'
      });
    }

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};

// ===== CREATE CONTROLLERS =====

// POST create new workout
export const createWorkout = async (req, res) => {
  try {
    const { title, load, reps } = req.body;

    // Validatie: zijn alle velden ingevuld?
    if (!title || load === undefined || reps === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Vul alle velden in: title, load, reps'
      });
    }

    // Validatie: zijn het de juiste types?
    if (typeof title !== 'string' || typeof load !== 'number' || typeof reps !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Veld types incorrect: title=string, load=number, reps=number'
      });
    }

    // Maak nieuw workout object
    const workout = new Workout({
      title: title.trim(),
      load,
      reps
    });

    // Sla het op in database
    const savedWorkout = await workout.save();

    res.status(201).json({
      success: true,
      message: 'Workout succesvol aangemaakt',
      data: savedWorkout
    });
  } catch (error) {
    // Mongoose validatie errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validatie fout',
        details: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};

// ===== UPDATE CONTROLLERS =====

// PATCH update workout
export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    // Validatie: Is het een geldig MongoDB ObjectId?
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Ongeldig workout ID formaat'
      });
    }

    const { title, load, reps } = req.body;

    // Maak update object
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (load !== undefined) updateData.load = load;
    if (reps !== undefined) updateData.reps = reps;

    const workout = await Workout.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout niet gevonden'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Workout bijgewerkt',
      data: workout
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validatie fout',
        details: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};

// ===== DELETE CONTROLLERS =====

// DELETE workout
export const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    // Validatie: Is het een geldig MongoDB ObjectId?
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Ongeldig workout ID formaat'
      });
    }

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout niet gevonden'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Workout verwijderd',
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};
