import express from 'express';
const reviewsRouter = express.Router(); 

import { createReviews, deleteReviews } from '../controllers/reviews/reviewsController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


reviewsRouter.post('/create-review/:id', isLoggedIn, createReviews);
reviewsRouter.delete('/:id/:reviewId', isLoggedIn, deleteReviews);

export default reviewsRouter;