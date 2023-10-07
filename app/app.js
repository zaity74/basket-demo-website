import express from 'express';
import cors from 'cors';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import userRouter from '../routes/auth.js';
import productRouter from '../routes/product.js';
import categoryRouter from '../routes/categories.js';
import cartRouter from '../routes/cart.js';
import sizeRouter from '../routes/sizes.js';
import reviewsRouter from '../routes/reviews.js';
import photosRouter from '../routes/photos.js';
import articleRouter from '../routes/article.js';
import playerRouter from '../routes/players.js';
import mediaRouter from '../routes/medias.js';
import articleReviewRouter from '../routes/articleReviews.js';
import gamesRouter from '../routes/games.js';
import { globalErrHandler, notFound } from '../middleware/globaleErrHandler.js';

const app = express(); // Invoke express as a function to create the app
app.use(express.json());


// DOTENV, TO USE ENV VARIABLE IN ALL APPLICATIONS
dotenv.config();

// db connect 
dbConnect();

// Add the CORS middleware with specific options
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Remplacez ceci par le domaine de votre frontend Netlify
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// MIDDLEWARE
app.use(notFound)
app.use(globalErrHandler)


// IMPORT ROUTES 
/* USER ROUTES */
app.use('/api/v1/games/', gamesRouter)
app.use('/api/v1/medias/', mediaRouter)
app.use('/api/v1/players/', playerRouter)
app.use('/api/v1/articles-reviews/', articleReviewRouter)
app.use('/api/v1/articles/', articleRouter)
app.use('/api/v1/photos/', photosRouter)
app.use('/api/v1/reviews/', reviewsRouter)
app.use('/api/v1/sizes/', sizeRouter)
app.use('/api/v1/category/', categoryRouter)
app.use('/api/v1/cart/', cartRouter)
app.use('/api/v1/products/', productRouter)
app.use('/api/v1/users/', userRouter);

  

export default app;
