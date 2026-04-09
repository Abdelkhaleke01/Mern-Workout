import AppointmentItem from './AppointmentItem';

export default function AppointmentList({ appointments, token, onCanceled }) {
  if (!appointments || appointments.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
        <p>Je hebt nog geen afspraken. Boek er een via de services.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment._id}
          appointment={appointment}
          token={token}
          onCanceled={onCanceled}
        />
      ))}
    </div>
  );
}
