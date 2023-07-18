import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Size from '../../model/Sizes.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'

// @description CREATE SIZE *************************************************
// @route POST /api/v1/size/create-size
// @access public 

export const createSize = asyncHandler(async (req, res) => {
    const { 
        name, 
        type,
    } = req.body;

    const isSizeExist = await Size.find({ name, type });

    if (isSizeExist.length > 0) {
        throw new Error('size already exists');
    }

    // create product
    const size = await Size.create({
        name, 
        type,
        user: req.userAuthId,
    });
  

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        data: size,
    });
});

// @description ALL SIZES *************************************************
// @route GET /api/v1/size/
// @access public 

export const getAllSize = asyncHandler(async (req, res) => {

    const size = await Size.find();

    res.status(201).json({
        status: 'success',
        message: 'sizes fetched successfully',
        data: size,
    });
});

// @description SINGLE SIZE *************************************************
// @route GET /api/v1/size/:id
// @access public 

export const getSingleSize = asyncHandler(async (req, res) => {
    const id = req.params.id
    const size = await Size.findOne({ _id: id });

    if(!size){
        res.json({
            msg: 'size not found'
        })
    }

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        size,
    });
});


// @description UPDATE SIZE *************************************************
// @route PUT /api/v1/size/update-size
// @access public 

export const updateSize = asyncHandler(async (req, res) => {
    const {
        name, 
        category,
      } = req.body;
    
      const id = req.params.id;
    
      const size = await Size.findByIdAndUpdate(
        id,
        {
            name, 
            category,
            product,
            user: req.userAuthId
        },
        {
          new: true, // Récupérer le document mis à jour
        }
      );
    
      res.status(201).json({
        status: 'success',
        message: 'Product updated successfully',
        data: size,
      });
});

// @description DELETE SIZE *************************************************
// @route DELETE /api/v1/size/delete-size/:id
// @access public 

export const deleteSize = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    const size = await Size.findByIdAndDelete({ _id: id });
  
    if (!size) {
      return res.status(404).json({
        status: 'fail',
        message: 'Size not found',
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'Size deleted successfully',
      data: size,
    });
  });
  