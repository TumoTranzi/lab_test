import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Movie Review Platform</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/search">Search Movies</Link>
          <Link className="nav-link" to="/my-reviews">My Reviews</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
