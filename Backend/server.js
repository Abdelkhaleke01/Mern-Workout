// Importeer modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import workoutRoutes from './routes/workouts.js';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';

// Maak Express app
const app = express();

// Haal variabelen uit .env
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// ===== MONGODB VERBINDING =====
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Database verbonden');
    
    // Start server als database verbonden is
    app.listen(PORT, () => {
      console.log(`✅ Server draait op http://localhost:${PORT}`);
      console.log('✅ Database verbonden & server draait');
    });
  })
  .catch((error) => {
    console.error('❌ Database verbinding mislukt:', error.message);
    process.exit(1);
  });

// ===== ROUTES =====

// Homepage route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Barber Booking API',
    version: '1.0.0',
    status: 'Online',
    endpoints: {
      auth: '/api/auth',
      appointments: '/api/appointments'
    }
  });
});

// Workout routes
app.use('/api/workouts', workoutRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Appointment routes
app.use('/api/appointments', appointmentRoutes);

// Error handler - 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route niet gevonden',
    path: req.path,
    method: req.method
  });
});
