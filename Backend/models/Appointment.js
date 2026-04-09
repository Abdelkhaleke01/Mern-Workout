import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: String,
      required: [true, 'Voeg een datum toe']
    },
    time: {
      type: String,
      required: [true, 'Voeg een tijd toe']
    },
    service: {
      type: String,
      enum: ['Knip', 'Fade', 'Baard'],
      required: [true, 'Kies een service']
    },
    status: {
      type: String,
      enum: ['Gepland', 'Geannuleerd'],
      default: 'Gepland'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
