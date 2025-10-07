import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.username} ({user.role})</p>
          {user.role === 'admin' && <Link to="/admin">Go to Admin Page</Link>}
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}
