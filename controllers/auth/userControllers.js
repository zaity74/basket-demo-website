import User from '../../model/User.js';

import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler'
import generateToken, { getTokenFromHeader } from '../../utils/generateToken.js'
import { verifyToken } from '../../utils/verifyToken.js';

// @description USER REGISTRATION *************************************************
// @route POST /api/v1/users/register
// @access public 

export const userRegister = asyncHandler(
    async (req, res) => {
        const { firstname, lastname, email, password } = req.body;
      
        const userExist = await User.findOne({ email: email });
      
        if (userExist) {
          throw new Error('user already exist')
        }
      
        // hash password 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        // create user 
        const user = await User.create({
          firstname,
          lastname,
          email,
          password : hashPassword
        });
        
        res.status(201).json({
          status: 'success',
          message: 'User registered successfully',
          data: user
        });
      }
);

// @description LOGIN USER *************************************************
// @route POST /api/v1/users/login
// @access public 

export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const userFound = await User.findOne({ email: email });
    console.log("🚀 ~ file: userControllers.js:49 ~ userLogin ~ userFound:", userFound)
  
    if (userFound && await bcrypt.compare(password, userFound?.password)) {
        return res.status(200).json({
            status: 'success',
            message: 'User login successfully',
            userFound,
            token: await generateToken(userFound?._id)
        })
    }else{
        throw new Error('invalid login credentials')
    }
  });

// @description USER PROFILE *************************************************
// @route POST /api/v1/users/profile
// @access private
// user want to access to his but has to be connected to the application

export const userProfile = asyncHandler(async (req, res) => {
    // get token from header
    const token = getTokenFromHeader(req)
    // verify if token not expired
    const verified = verifyToken(token)
    console.log(req)
    return res.json({
        msg: 'Welcome to profile page'
    })
  
  });
