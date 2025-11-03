import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    if (!query.trim()) {
      setError('Please enter a movie title to search.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '3f66b9a19514b9e22641273ce7e569e6',
          query: query.trim()
        }
      });
      setMovies(response.data.results);
      if (response.data.results.length === 0) {
        setError('No movies found. Try a different search term.');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to search movies. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setMovies([]);
    setError('');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Movies</h1>
      <p className="text-muted">Find your favorite movies and read reviews from other users.</p>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter movie title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-primary btn-lg"
              onClick={searchMovies}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Searching...
                </>
              ) : (
                <>
                  <i className="bi bi-search me-2"></i>Search
                </>
              )}
            </button>
            {(query || movies.length > 0) && (
              <button
                className="btn btn-outline-secondary btn-lg"
                onClick={clearSearch}
                disabled={loading}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {movies.length > 0 && (
        <div className="mb-3">
          <p className="text-muted">Found {movies.length} movie{movies.length !== 1 ? 's' : ''}</p>
        </div>
      )}

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="card-img-top bg-light d-flex align-items-center justify-content-center"
                  style={{ height: '300px' }}
                >
                  <i className="bi bi-film text-muted" style={{ fontSize: '3rem' }}></i>
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted small">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  {movie.vote_average > 0 && (
                    <span className="ms-2">
                      <i className="bi bi-star-fill text-warning"></i> {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </p>
                <p className="card-text flex-grow-1">
                  {movie.overview ? movie.overview.substring(0, 120) + '...' : 'No description available.'}
                </p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary mt-auto">
                  <i className="bi bi-eye me-1"></i>View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {movies.length === 0 && !loading && !error && query && (
        <div className="text-center mt-5">
          <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
          <h3 className="mt-3">Start Your Movie Search</h3>
          <p className="text-muted">Enter a movie title above to find movies and read reviews.</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
