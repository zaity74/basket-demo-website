import express from 'express';
const articleReviewRouter = express.Router(); 

import { createArticleReview, deleteArticleReview } from '../controllers/reviews/articlreviewsController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


articleReviewRouter.post('/create-review/:id', isLoggedIn, createArticleReview);
articleReviewRouter.delete('/:id/:reviewId', isLoggedIn, deleteArticleReview);

export default articleReviewRouter;