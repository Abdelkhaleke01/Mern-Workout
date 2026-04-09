import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id }).sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { date, time, service } = req.body;

    if (!date || !time || !service) {
      return res.status(400).json({
        success: false,
        error: 'Vul datum, tijd en service in'
      });
    }

    if (!['Knip', 'Fade', 'Baard'].includes(service)) {
      return res.status(400).json({
        success: false,
        error: 'Service moet Knip, Fade of Baard zijn'
      });
    }

    const appointment = await Appointment.create({
      userId: req.user.id,
      date,
      time,
      service
    });

    res.status(201).json({
      success: true,
      message: 'Afspraak succesvol aangemaakt',
      data: appointment
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

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Ongeldig afspraak ID formaat'
      });
    }

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { status: 'Geannuleerd' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Afspraak niet gevonden'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Afspraak geannuleerd',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};
