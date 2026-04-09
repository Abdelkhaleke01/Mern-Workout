export default function AppointmentItem({ appointment, token, onCanceled }) {
  const cancelAppointment = async () => {
    if (!window.confirm('Weet je zeker dat je deze afspraak wilt annuleren?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/appointments/${appointment._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Fout bij annuleren van de afspraak');
      }

      onCanceled();
    } catch (err) {
      alert(err.message);
      console.error('❌ Cancel error:', err);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '18px', backgroundColor: appointment.status === 'Geannuleerd' ? '#fff3e0' : '#fafafa' }}>
      <h3>{appointment.service}</h3>
      <p><strong>Datum:</strong> {appointment.date}</p>
      <p><strong>Tijd:</strong> {appointment.time}</p>
      <p><strong>Status:</strong> {appointment.status}</p>
      <button
        onClick={cancelAppointment}
        disabled={appointment.status === 'Geannuleerd'}
        style={{
          padding: '8px 16px',
          backgroundColor: appointment.status === 'Geannuleerd' ? '#ccc' : '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: appointment.status === 'Geannuleerd' ? 'not-allowed' : 'pointer'
        }}
      >
        {appointment.status === 'Geannuleerd' ? 'Geannuleerd' : 'Annuleer afspraak'}
      </button>
    </div>
  );
}
