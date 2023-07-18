import express from 'express';
const categoryRouter = express.Router(); 

import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from '../controllers/category/categorieController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


categoryRouter.post('/create-category', isLoggedIn, createCategory);
categoryRouter.get('/all', getAllCategory);
categoryRouter.get('/:slug', getSingleCategory);
categoryRouter.put('/update-category/:id', isLoggedIn, updateCategory);
categoryRouter.delete('/delete-category/:id', isLoggedIn, deleteCategory);

export default categoryRouter