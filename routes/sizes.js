import express from 'express';
const sizeRouter = express.Router(); 

import { 
    createSize, 
    getAllSize,
    getSingleSize,
    updateSize,
    deleteSize
} from '../controllers/sizes/sizeController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


sizeRouter.post('/create-size', isLoggedIn, createSize);
sizeRouter.get('/all', getAllSize);
sizeRouter.get('/:slug', getSingleSize);
sizeRouter.put('/update-size/:id', isLoggedIn, updateSize);
sizeRouter.delete('/delete-size/:id', isLoggedIn, deleteSize);

export default sizeRouter