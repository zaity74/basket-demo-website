import express from 'express';
const userRouter = express.Router(); 

import { userLogin, userProfile, userRegister } from '../controllers/auth/userControllers.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.get('/profile', isLoggedIn, userProfile);

export default userRouter