import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import AppointmentList from './components/AppointmentList';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchAppointments();
    } else {
      setAppointments([]);
      setLoading(false);
    }
  }, [token]);

  const fetchAppointments = async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Fout bij het ophalen van afspraken');
      }

      const data = await response.json();
      setAppointments(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('❌ Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setAppointments([]);
    navigate('/login');
  };

  const onBookingCreated = () => {
    fetchAppointments();
  };

  const onAppointmentCanceled = () => {
    fetchAppointments();
  };

  const ServicesPage = (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Services />
    </div>
  );

  const AppointmentsPage = (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mijn afspraken</h1>
      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: '5px',
          marginBottom: '20px',
          color: '#d32f2f'
        }}>
          ❌ {error}
        </div>
      )}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>⏳ Bezig met laden...</p>
        </div>
      ) : (
        <AppointmentList appointments={appointments} token={token} onCanceled={onAppointmentCanceled} />
      )}
    </div>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Navbar token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/services" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={token ? <Navigate to="/services" replace /> : <Login onAuth={handleAuth} />} />
        <Route path="/register" element={token ? <Navigate to="/services" replace /> : <Register onAuth={handleAuth} />} />
        <Route
          path="/services"
          element={
            <ProtectedRoute token={token}>
              {ServicesPage}
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:service"
          element={
            <ProtectedRoute token={token}>
              <BookingForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute token={token}>
              <BookingForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute token={token}>
              {AppointmentsPage}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
