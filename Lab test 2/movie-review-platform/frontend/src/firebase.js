import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCmgxbvguxCNWpsxNCM4zD5UTJJqnHNxyc",
  authDomain: "movie-review-app1.firebaseapp.com",
  projectId: "movie-review-app1",
  storageBucket: "movie-review-app1.appspot.com",
  messagingSenderId: "101397003399788050755",
  appId: "1:101397003399788050755:web:fa4a3a40fbbc1d110752479a2c7fc0a0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
