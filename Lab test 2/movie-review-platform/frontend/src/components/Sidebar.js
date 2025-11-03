import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ user }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px', position: 'fixed', left: 0, top: 0 }}>
      <h4 className="mb-4">Movie Reviews</h4>
      {user && (
        <div className="mb-3">
          <small className="text-muted">Welcome, {user.displayName || user.email}!</small>
        </div>
      )}
      <nav className="nav flex-column">
        <Link
          to="/"
          className={`nav-link text-white mb-2 ${isActive('/') ? 'bg-primary rounded p-2' : ''}`}
        >
          <i className="bi bi-house-door me-2"></i>
          Home
        </Link>
        {!user ? (
          <Link
            to="/auth"
            className={`nav-link text-white mb-2 ${isActive('/auth') ? 'bg-primary rounded p-2' : ''}`}
          >
            <i className="bi bi-person-circle me-2"></i>
            Login/Register
          </Link>
        ) : (
          <>
            <Link
              to="/search"
              className={`nav-link text-white mb-2 ${isActive('/search') ? 'bg-primary rounded p-2' : ''}`}
            >
              <i className="bi bi-search me-2"></i>
              Search Movies
            </Link>
            <Link
              to="/add-review"
              className={`nav-link text-white mb-2 ${isActive('/add-review') ? 'bg-primary rounded p-2' : ''}`}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Review
            </Link>
            <Link
              to="/my-reviews"
              className={`nav-link text-white mb-2 ${isActive('/my-reviews') ? 'bg-primary rounded p-2' : ''}`}
            >
              <i className="bi bi-star me-2"></i>
              My Reviews
            </Link>
            <button
              onClick={handleLogout}
              className="nav-link text-white mb-2 btn btn-link text-start p-0"
              style={{ background: 'none', border: 'none' }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
