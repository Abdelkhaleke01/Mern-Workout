import { Link } from 'react-router-dom';

const services = [
  { key: 'Knip', title: 'Knip', price: '€25', description: 'Standaard haarknip' },
  { key: 'Fade', title: 'Fade', price: '€30', description: 'Fade haircut' },
  { key: 'Baard', title: 'Baard', price: '€15', description: 'Baard trimmen' }
];

export default function Services() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>Beschikbare services</h1>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {services.map((service) => (
          <div key={service.key} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p style={{ fontWeight: 'bold' }}>{service.price}</p>
            <Link
              to={`/book/${service.key}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '10px 18px',
                backgroundColor: '#2196F3',
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none'
              }}
            >
              Boek nu
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
