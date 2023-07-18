import express from 'express';
const articleRouter = express.Router(); 

import { 
    createArticle,
    getAllArticle,
    getArticleDetail,
    updateArticle,
    deleteArticle
} 
from '../controllers/actualite/actuController.js';

import { isLoggedIn } from '../middleware/isLoggedIn.js';

articleRouter.post('/create-article', isLoggedIn, createArticle);
articleRouter.get(`/:id`, getArticleDetail);
articleRouter.put(`/:id`, isLoggedIn, updateArticle);
articleRouter.delete(`/:id/delete-article`, isLoggedIn, deleteArticle);
articleRouter.get('/', getAllArticle);

export default articleRouter