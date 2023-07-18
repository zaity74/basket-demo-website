import express from 'express';
const mediaRouter = express.Router(); 

import { createMedia, getAllMedia, deleteMedia } from '../controllers/medias/mediaController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


mediaRouter.post('/create-media', isLoggedIn, createMedia);
mediaRouter.get('/all', getAllMedia);
mediaRouter.delete('/delete-media/:id', isLoggedIn, deleteMedia);

export default mediaRouter