import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '3f66b9a19514b9e22641273ce7e569e6',
            page: 1
          }
        });
        setPopularMovies(response.data.results.slice(0, 8)); // Get first 8 movies
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        // Fallback to placeholder data if API fails
        setPopularMovies([
          { id: 1, title: 'Inception', vote_average: 8.8, poster_path: null },
          { id: 2, title: 'The Dark Knight', vote_average: 9.0, poster_path: null },
          { id: 3, title: 'Interstellar', vote_average: 8.6, poster_path: null },
          { id: 4, title: 'Pulp Fiction', vote_average: 8.9, poster_path: null },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MovieHub</h1>
          <p>Discover amazing movies, read authentic reviews, and share your cinematic opinions with fellow movie enthusiasts.</p>
          <Link to="/search" className="cta-button">
            <i className="bi bi-search me-2"></i>Start Exploring
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose MovieHub?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="icon">
                  <i className="bi bi-search"></i>
                </div>
                <h3>Powerful Search</h3>
                <p>Find any movie instantly with our comprehensive database powered by TMDB. Discover new films and classics alike.</p>
                <Link to="/search" className="feature-button">Search Movies</Link>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="icon">
                  <i className="bi bi-star-fill"></i>
                </div>
                <h3>Community Reviews</h3>
                <p>Read genuine reviews from real movie lovers. Get insights and recommendations from people who share your taste.</p>
                <Link to="/search" className="feature-button">Browse Reviews</Link>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="icon">
                  <i className="bi bi-pencil-square"></i>
                </div>
                <h3>Share Your Voice</h3>
                <p>Join the conversation! Write reviews, rate movies, and help others discover their next favorite film.</p>
                <Link to="/auth" className="feature-button">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="popular-movies">
        <div className="container">
          <h2 className="section-title">Trending Movies</h2>
          <p className="section-subtitle">Check out what's popular right now</p>

          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="movies-grid">
              {popularMovies.map(movie => (
                <div key={movie.id} className="movie-card">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                  ) : (
                    <div className="movie-poster-placeholder">
                      <i className="bi bi-film"></i>
                      <p>No Image</p>
                    </div>
                  )}
                  <div className="movie-info">
                    <h4 className="movie-title">{movie.title}</h4>
                    <div className="movie-rating">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                    </div>
                    <Link to={`/movie/${movie.id}`} className="movie-button">
                      <i className="bi bi-eye me-1"></i>View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/search" className="btn btn-outline-primary btn-lg">
              <i className="bi bi-search me-2"></i>Explore More Movies
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to Join the Movie Community?</h2>
          <p>Create an account to start reviewing movies and connecting with other film enthusiasts.</p>
          <div className="cta-buttons">
            <Link to="/auth" className="btn btn-primary btn-lg me-3">
              <i className="bi bi-person-plus me-2"></i>Sign Up Free
            </Link>
            <Link to="/search" className="btn btn-outline-light btn-lg">
              <i className="bi bi-search me-2"></i>Browse Movies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
