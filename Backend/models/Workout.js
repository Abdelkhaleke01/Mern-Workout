import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Voeg een title toe'],
      trim: true,
      minlength: [3, 'Title moet minstens 3 karakters zijn'],
      maxlength: [50, 'Title mag max 50 karakters zijn']
    },
    load: {
      type: Number,
      required: [true, 'Voeg load toe'],
      min: [0, 'Load moet groter zijn dan 0'],
      max: [500, 'Load mag max 500 zijn']
    },
    reps: {
      type: Number,
      required: [true, 'Voeg reps toe'],
      min: [1, 'Reps moet minimaal 1 zijn'],
      max: [100, 'Reps mag max 100 zijn']
    }
  },
  { timestamps: true }
);

export default mongoose.model('Workout', workoutSchema);
