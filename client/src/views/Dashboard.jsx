import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      {user ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-700 mb-4">
            Welcome, <span className="font-semibold text-blue-600">{user.username}</span>
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
              {user.role}
            </span>
          </p>
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Go to Admin Page
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-700">Please log in.</p>
        </div>
      )}
    </div>
  );
}
