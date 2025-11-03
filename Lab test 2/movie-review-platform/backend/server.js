const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { db } = require('./firebase-config');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const TMDB_API_KEY = '3f66b9a19514b9e22641273ce7e569e6';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Get movies from TMDB
app.get('/api/movies/search', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: q
      }
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Get movie details
app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection('reviews').get();
    const reviews = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Create a review
app.post('/api/reviews', async (req, res) => {
  const { movieId, user, rating, comment } = req.body;
  try {
    const newReview = {
      movieId,
      user,
      rating: parseInt(rating),
      comment,
      createdAt: new Date()
    };
    const docRef = await db.collection('reviews').add(newReview);
    res.status(201).json({ id: docRef.id, ...newReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review
app.put('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    await db.collection('reviews').doc(id).update({
      rating: parseInt(rating),
      comment,
      updatedAt: new Date()
    });
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
app.delete('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('reviews').doc(id).delete();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
