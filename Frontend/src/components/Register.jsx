import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ onAuth }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Fout bij registreren');
      }

      onAuth(data.data.token);
      navigate('/workouts');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label>
            Naam:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '18px' }}>
          <label>
            Wachtwoord:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Bezig...' : 'Registeren'}
        </button>
      </form>
      <p style={{ marginTop: '18px' }}>
        Heb je al een account? <Link to="/login">Inloggen</Link>
      </p>
    </div>
  );
}
