import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '3f66b9a19514b9e22641273ce7e569e6'
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/reviews');
        setReviews(response.data.filter(review => review.movieId === id));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const loadData = async () => {
      await Promise.all([fetchMovie(), fetchReviews()]);
      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Movie not found</h4>
          <p>Sorry, we couldn't find the movie you're looking for.</p>
          <Link to="/search" className="btn btn-primary">Search Movies</Link>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h1 className="mb-3">{movie.title}</h1>
          <p className="lead">{movie.overview}</p>
          <div className="row mb-3">
            <div className="col-sm-6">
              <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            <div className="col-sm-6">
              <p><strong>TMDB Rating:</strong> {movie.vote_average}/10</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6">
              <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            </div>
            <div className="col-sm-6">
              <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
            </div>
          </div>
          <div className="mb-3">
            <p><strong>User Rating:</strong> {averageRating}/5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</p>
          </div>
          {user ? (
            <Link to={`/add-review/${id}`} className="btn btn-primary btn-lg">
              <i className="bi bi-star-fill me-2"></i>Add Your Review
            </Link>
          ) : (
            <div className="alert alert-info">
              <strong>Want to add a review?</strong> <Link to="/auth">Sign in</Link> to share your thoughts about this movie!
            </div>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="mb-4">User Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <div className="alert alert-light">
            <h5>No reviews yet</h5>
            <p>Be the first to review this movie!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{review.user}</h5>
                  <div className="text-warning">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    <small className="text-muted ms-2">({review.rating}/5)</small>
                  </div>
                </div>
                <p className="card-text">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
