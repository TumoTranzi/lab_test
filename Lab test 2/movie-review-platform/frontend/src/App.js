import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MovieSearch from './pages/MovieSearch';
import MovieDetails from './pages/MovieDetails';
import AddReview from './pages/AddReview';
import MyReviews from './pages/MyReviews';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;
  }

  return (
    <Router>
      <div className="App d-flex">
        <Sidebar user={user} />
        <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/add-review/:movieId" element={<AddReview />} />
            <Route path="/my-reviews" element={<MyReviews />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
