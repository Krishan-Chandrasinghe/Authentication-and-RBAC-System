import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminPage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user.username}. You have admin access.</p>
    </div>
  );
}
