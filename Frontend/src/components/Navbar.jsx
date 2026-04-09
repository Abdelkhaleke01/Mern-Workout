import { Link } from 'react-router-dom';

export default function Navbar({ token, onLogout }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <div>
        <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
          Barber Booking
        </Link>
        {token ? (
          <>
            <Link to="/services" style={{ marginRight: '10px', textDecoration: 'none', color: '#333' }}>
              Services
            </Link>
            <Link to="/appointments" style={{ textDecoration: 'none', color: '#333' }}>
              Mijn afspraken
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#333' }}>
              Login
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>
              Register
            </Link>
          </>
        )}
      </div>
      {token && (
        <button
          onClick={onLogout}
          style={{ padding: '8px 15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
