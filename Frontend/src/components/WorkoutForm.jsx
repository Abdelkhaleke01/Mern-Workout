import { useState } from 'react';

export default function WorkoutForm({ onWorkoutAdded, token }) {
  const [formData, setFormData] = useState({
    title: '',
    load: '',
    reps: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'title' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Fout bij het aanmaken van workout');
      }

      const data = await response.json();
      console.log('✅ Workout aangemaakt:', data.data);
      
      setFormData({ title: '', load: '', reps: '' });
      onWorkoutAdded();
    } catch (err) {
      setError(err.message);
      console.error('❌ Fout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h2>Nieuw Workout</h2>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Bijv: Push Day"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Load (kg):
            <input
              type="number"
              name="load"
              value={formData.load}
              onChange={handleChange}
              placeholder="Bijv: 50"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Reps:
            <input
              type="number"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
              placeholder="Bijv: 10"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Bezig...' : 'Voeg toe'}
        </button>
      </form>
    </div>
  );
}
