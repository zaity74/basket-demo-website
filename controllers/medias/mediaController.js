import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'
import Photos from '../../model/Photos.js';
import Media from '../../model/Medias.js';

// @description CREATE CATEGORY *************************************************
// @route POST /api/v1/category/create-category
// @access public 

export const createMedia = asyncHandler(async (req, res) => {
    const {
        title, 
        file, 
        image,
        type, 
    } = req.body;

    const isMediaExist = await Media.findOne({ image });

    if (isMediaExist) {
        throw new Error('category already exists');
    }

    // create product
    const media = await Media.create({ 
        file,
        title,
        image,
        type,
        user: req.userAuthId,
    });

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        data: media,
    });
});

// @description ALL CATEGORY *************************************************
// @route GET /api/v1/category/
// @access public 

export const getAllMedia = asyncHandler(async (req, res) => {

    const media = await Media.find();

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        data: media,
    });
});


// @description DELETE CATEGORY *************************************************
// @route DELETE /api/v1/category/delete-category/:id
// @access public 

export const deleteMedia = asyncHandler(async (req, res) => {
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
  