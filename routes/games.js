import express from 'express';
const gamesRouter = express.Router(); 

import { geRanking } from '../controllers/games/rankingController.js';
import { getCalendar } from '../controllers/games/calendarController.js';


gamesRouter.get('/ranking', geRanking);
gamesRouter.get('/calendar', getCalendar);

export default gamesRouter