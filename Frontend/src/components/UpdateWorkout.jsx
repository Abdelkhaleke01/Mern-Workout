import { useState } from 'react';

export default function UpdateWorkout({ workout, token, onCancel, onUpdated }) {
  const [editData, setEditData] = useState({
    title: workout.title,
    load: workout.load,
    reps: workout.reps
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'title' ? value : Number(value)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Fout bij het bijwerken van de workout');
      }

      await response.json();
      onUpdated();
    } catch (err) {
      setError(err.message);
      console.error('❌ Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '15px',
      border: '2px solid #2196F3',
      borderRadius: '5px',
      backgroundColor: '#f0f8ff'
    }}>
      <h3>Wijzig Workout</h3>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <div style={{ marginBottom: '10px' }}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Load:
          <input
            type="number"
            name="load"
            value={editData.load}
            onChange={handleChange}
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
            value={editData.reps}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
          />
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '8px 15px',
          backgroundColor: loading ? '#ccc' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Bezig...' : 'Opslaan'}
      </button>
      <button
        onClick={onCancel}
        style={{
          padding: '8px 15px',
          backgroundColor: '#999',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Annuleren
      </button>
    </div>
  );
}
