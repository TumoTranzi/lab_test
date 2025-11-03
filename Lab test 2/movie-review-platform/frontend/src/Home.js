import React from 'react';
import './Home.css'; // Assuming we create a separate CSS file for styles

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Movie Review Platform</h1>
          <p>Discover and review your favorite movies!</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="icon">🔍</div>
          <h3>Search Movies</h3>
          <p>Find movies using our search feature powered by TMDB.</p>
          <button className="feature-button">Search Now</button>
        </div>
        <div className="feature-card">
          <div className="icon">📖</div>
          <h3>Read Reviews</h3>
          <p>See what others think about movies.</p>
          <button className="feature-button">Browse Reviews</button>
        </div>
        <div className="feature-card">
          <div className="icon">✍️</div>
          <h3>Write Reviews</h3>
          <p>Share your opinions and ratings.</p>
          <button className="feature-button">Write a Review</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
