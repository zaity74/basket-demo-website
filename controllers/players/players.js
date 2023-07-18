import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'
import Photos from '../../model/Photos.js';
import Media from '../../model/Medias.js';
import Player from '../../model/Players.js';

// @description CREATE CATEGORY *************************************************
// @route POST /api/v1/category/create-category
// @access public 

export const createPlayer = asyncHandler(async (req, res) => {
    const { 
        firstname,
        lastname,
        slug, 
        age, 
        nationalite, 
        playerNum, 
        position,
        image,  
        user
    } = req.body;

    const isPlayerExist = await Player.findOne({ image });

    if (isPlayerExist) {
        throw new Error('player already exists');
    }

    // create product
    const player = await Player.create({ 
        firstname,
        lastname,
        slug, 
        age, 
        nationalite, 
        playerNum, 
        position,
        image,  
        user: req.userAuthId,
    });

    res.status(201).json({
        status: 'success',
        message: 'player created successfully',
        data: player,
    });
});

// @description ALL CATEGORY *************************************************
// @route GET /api/v1/category/
// @access public 

export const getAllPlayer = asyncHandler(async (req, res) => {

    const player = await Player.find();

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        data: player,
    });
});


// @description DELETE CATEGORY *************************************************
// @route DELETE /api/v1/category/delete-category/:id
// @access public 

export const deletePlayer = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    const media = await Media.findByIdAndDelete({ _id: id });
  
    if (!media) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }
    console.log('ID:',id)
    res.status(201).json({
      status: 'success',
      message: 'Category deleted successfully',
      data: media,
    });
  });

// @description SINGLE CATEGORY *************************************************
// @route GET /api/v1/category/:id
// @access public 

export const getSinglePlayer = asyncHandler(async (req, res) => {
    const slug = req.params.slug
    const player = await Player.findOne({ slug });

    if(!player){
        res.json({
            msg: 'player not found'
        })
    }

    res.status(201).json({
        status: 'success',
        message: 'player created successfully',
        player,
    });
});

// @description UPDATE CATEGORY *************************************************
// @route PUT /api/v1/category/update-category
// @access public 

export const updatePlayer = asyncHandler(async (req, res) => {
    const {
        firstname,
        lastname,
        slug, 
        age, 
        nationalite, 
        playerNum, 
        position,
        image,  
        user
      } = req.body;
    
      const id = req.params.id;
    
      const player = await Player.findByIdAndUpdate(
        id,
        {
            firstname,
            lastname,
            slug, 
            age, 
            nationalite, 
            playerNum, 
            position,
            image,  
            user: req.userAuthId
        },
        {
          new: true, // Récupérer le document mis à jour
        }
      );
    
      res.status(201).json({
        status: 'success',
        message: 'Product updated successfully',
        data: player,
      });
});