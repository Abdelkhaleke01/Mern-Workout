import { useState } from 'react';

export default function DeleteWorkout({ workoutId, token, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!confirm('Zeker dat je deze workout wilt verwijderen?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Fout bij verwijderen');
      }

      await response.json();
      onDeleted();
    } catch (err) {
      setError(err.message);
      console.error('❌ Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          padding: '8px 15px',
          backgroundColor: loading ? '#ccc' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Bezig...' : '🗑️ Verwijder'}
      </button>
    </div>
  );
}
