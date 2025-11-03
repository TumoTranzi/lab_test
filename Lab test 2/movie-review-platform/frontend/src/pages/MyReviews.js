import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/reviews');
      const userReviews = response.data.filter(review =>
        review.user === (user.displayName || user.email)
      );
      setReviews(userReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:5001/api/reviews/${id}`);
        setReviews(reviews.filter(review => review.id !== id));
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review. Please try again.');
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/reviews/${id}`, {
        rating: editRating,
        comment: editComment
      });
      setReviews(reviews.map(review =>
        review.id === id ? { ...review, rating: editRating, comment: editComment } : review
      ));
      setEditingReview(null);
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review. Please try again.');
    }
  };

  const startEditing = (review) => {
    setEditingReview(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const cancelEditing = () => {
    setEditingReview(null);
    setEditRating(5);
    setEditComment('');
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Please log in to view your reviews</h4>
          <p>You need to be logged in to see your movie reviews.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>My Reviews</h1>
      <p className="text-muted">Welcome back, {user.displayName || user.email}!</p>

      {reviews.length === 0 ? (
        <div className="alert alert-info">
          <h5>No reviews yet</h5>
          <p>You haven't written any movie reviews yet. Start by searching for movies and adding your reviews!</p>
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Movie ID: {review.movieId}</h5>

              {editingReview === review.id ? (
                <div className="mb-3">
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                      className="form-select"
                      value={editRating}
                      onChange={(e) => setEditRating(parseInt(e.target.value))}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleUpdate(review.id)}
                  >
                    Save Changes
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="card-text">
                    <strong>Rating:</strong> {review.rating}/5
                  </p>
                  <p className="card-text">
                    <strong>Comment:</strong> {review.comment}
                  </p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => startEditing(review)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
