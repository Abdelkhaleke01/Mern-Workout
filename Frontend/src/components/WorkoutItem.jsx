import { useState } from 'react';
import UpdateWorkout from './UpdateWorkout';
import DeleteWorkout from './DeleteWorkout';

export default function WorkoutItem({ workout, token, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL') + ' ' + date.toLocaleTimeString('nl-NL');
  };

  return (
    <div style={{
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      {isEditing ? (
        <UpdateWorkout
          workout={workout}
          token={token}
          onCancel={() => setIsEditing(false)}
          onUpdated={() => {
            setIsEditing(false);
            onUpdate();
          }}
        />
      ) : (
        <>
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

          <DeleteWorkout workoutId={workout._id} token={token} onDeleted={onDelete} />
        </>
      )}
    </div>
  );
}
