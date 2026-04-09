import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Voeg een naam toe'],
      trim: true,
      minlength: [2, 'Naam moet minstens 2 tekens zijn'],
      maxlength: [50, 'Naam mag maximaal 50 tekens zijn']
    },
    email: {
      type: String,
      required: [true, 'Voeg een email toe'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Geef een geldig e-mailadres op']
    },
    password: {
      type: String,
      required: [true, 'Voeg een wachtwoord toe'],
      minlength: [6, 'Wachtwoord moet minstens 6 tekens zijn']
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
