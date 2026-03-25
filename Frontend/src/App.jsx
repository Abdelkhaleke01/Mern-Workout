import { useState, useEffect } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Laad workouts bij mount en na updates
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:4000/api/workouts');
      
      if (!response.ok) {
        throw new Error('Fout bij het ophalen van workouts');
      }

      const data = await response.json();
      console.log('✅ Workouts geladen:', data);
      setWorkouts(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('❌ Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutAdded = () => {
    console.log('🔄 Herlaad workouts na toevoegen...');
    fetchWorkouts();
  };

  const handleWorkoutUpdate = () => {
    console.log('🔄 Herlaad workouts na update...');
    fetchWorkouts();
  };

  const handleWorkoutDelete = () => {
    console.log('🔄 Herlaad workouts na verwijdering...');
    fetchWorkouts();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>💪 MERN Workout App</h1>
      
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

      <WorkoutForm onWorkoutAdded={handleWorkoutAdded} />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>⏳ Bezig met laden...</p>
        </div>
      ) : (
        <WorkoutList
          workouts={workouts}
          onWorkoutUpdate={handleWorkoutUpdate}
          onWorkoutDelete={handleWorkoutDelete}
        />
      )}
    </div>
  );
}
