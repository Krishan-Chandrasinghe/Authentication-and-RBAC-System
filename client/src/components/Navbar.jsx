import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
  <div className="flex items-center space-x-6">
    <Link 
      to="/" 
      className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200"
    >
      Home
    </Link>
  </div>
  
  <div className="flex items-center space-x-4">
    {!user && (
      <>
        <Link 
          to="/login" 
          className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Register
        </Link>
      </>
    )}
    {user && (
      <button 
        onClick={logout}
        className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-gray-300 hover:border-red-300"
      >
        Logout
      </button>
    )}
  </div>
</nav>
  );
}
