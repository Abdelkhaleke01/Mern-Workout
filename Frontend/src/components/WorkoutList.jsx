import WorkoutItem from './WorkoutItem';

export default function WorkoutList({ workouts, token, onWorkoutUpdate, onWorkoutDelete }) {
  if (!workouts || workouts.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
        <p>Geen workouts gevonden. Voeg er een toe!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Mijn Workouts ({workouts.length})</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {workouts.map(workout => (
          <WorkoutItem
            key={workout._id}
            workout={workout}
            token={token}
            onUpdate={onWorkoutUpdate}
            onDelete={onWorkoutDelete}
          />
        ))}
      </div>
    </div>
  );
}
