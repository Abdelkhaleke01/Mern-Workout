import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onAuth }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Fout bij inloggen');
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
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      <form onSubmit={handleSubmit}>
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
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Bezig...' : 'Inloggen'}
        </button>
      </form>
      <p style={{ marginTop: '18px' }}>
        Nog geen account? <Link to="/register">Registeren</Link>
      </p>
    </div>
  );
}
