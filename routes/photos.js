import express from 'express';
const photosRouter = express.Router(); 

import { createPhotos, deletePhotos } from '../controllers/photos/photosController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


photosRouter.post('/create-photos/:id', isLoggedIn, createPhotos);
photosRouter.delete('/:id/:photoId', isLoggedIn, deletePhotos);

export default photosRouter;