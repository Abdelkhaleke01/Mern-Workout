import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const services = ['Knip', 'Fade', 'Baard'];

export default function BookingForm({ token }) {
  const { service: serviceParam } = useParams();
  const [formData, setFormData] = useState({
    service: services.includes(serviceParam) ? serviceParam : services[0],
    date: '',
    time: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Fout bij het maken van de afspraak');
      }

      setSuccess('Afspraak succesvol geboekt!');
      setFormData({
        service: services.includes(serviceParam) ? serviceParam : services[0],
        date: '',
        time: ''
      });
      setTimeout(() => navigate('/appointments'), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2>Boek een afspraak</h2>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Service:
            <select name="service" value={formData.service} onChange={handleChange} style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Datum:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Tijd:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
            />
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Bezig...' : 'Boek afspraak'}
        </button>
      </form>
    </div>
  );
}
