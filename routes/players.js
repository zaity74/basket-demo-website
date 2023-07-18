import express from 'express';
const playerRouter = express.Router(); 

import { 
    createPlayer, 
    getAllPlayer,
    getSinglePlayer,
    updatePlayer,
    deletePlayer
} from '../controllers/players/players.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


playerRouter.post('/create-player', isLoggedIn, createPlayer);
playerRouter.get('/all', getAllPlayer);
playerRouter.get('/:slug', getSinglePlayer);
playerRouter.put('/update-player/:id', isLoggedIn, updatePlayer);
playerRouter.delete('/delete-player/:id', isLoggedIn, deletePlayer);

export default playerRouter