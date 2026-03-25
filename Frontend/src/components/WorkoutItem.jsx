import { useState } from 'react';

export default function WorkoutItem({ workout, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: workout.title,
    load: workout.load,
    reps: workout.reps
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'title' ? value : Number(value)
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Fout bij update');
      }

      const data = await response.json();
      console.log('✅ Workout bijgewerkt:', data.data);
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      setError(err.message);
      console.error('❌ Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Zeker dat je dit workout wilt verwijderen?')) {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Fout bij verwijderin');
        }

        const data = await response.json();
        console.log('✅ Workout verwijderd:', data.data);
        onDelete();
      } catch (err) {
        setError(err.message);
        console.error('❌ Delete error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL') + ' ' + date.toLocaleTimeString('nl-NL');
  };

  if (isEditing) {
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
              onChange={handleEditChange}
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
              onChange={handleEditChange}
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
              onChange={handleEditChange}
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>

        <button
          onClick={handleUpdate}
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
          onClick={() => setIsEditing(false)}
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

  return (
    <div style={{
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{workout.title}</h3>
      <p>
        <strong>Load:</strong> {workout.load} kg | <strong>Reps:</strong> {workout.reps}
      </p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        {formatDate(workout.createdAt)}
      </p>

      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: '8px 15px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px',
          cursor: 'pointer'
        }}
      >
        ✏️ Wijzig
      </button>

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
