import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'
import Photos from '../../model/Photos.js';

// @description CREATE PHOTOS *************************************************
// @route POST /api/v1/photos/create-photos
// @access public 

export const createPhotos = asyncHandler(async (req, res) => {
    const { 
        id
    } = req.params

    const { 
        image,
        user
    } = req.body

    // find Product
    const productFound = await Product.findById(id).populate('photos');
    if (!productFound) {
        throw new Error('product not found');
    }

    
    // create review
    const photo = await Photos.create({
        product: productFound._id,
        image,
        user: req.userAuthId,
    });

    productFound.photos.push(photo?._id);
    await productFound.save();

    res.status(201).json({
        status: 'success',
        message: 'Photo created successfully',
        data: photo,
    });

});



// @description REMOVE REVIEWS *************************************************
// @route POST /api/v1/reviews/:id/:reviewId
// @access public 

export const deletePhotos = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const photoId = req.params.photoId;
  
    // FIND THE PRODUCT
    const productFound = await Product.findById(id);
  
    // FIND THE INDEX OF THE REVIEW INSIDE THE PRODUCT'S REVIEWS ARRAY
    const photoIndex = productFound?.photos?.findIndex((r) => {
      return r?._id.toString() === photoId.toString();
    });
    console.log('PHOTO INDEX :',photoIndex)
  
    if (photoIndex !== -1) {
      // REMOVE THE REVIEW FROM THE PRODUCT'S REVIEWS ARRAY
      productFound.photos.splice(photoIndex, 1);
  
      // SAVE THE UPDATED PRODUCT
      await productFound.save();
  
      return res.status(200).json({
        status: 'success',
        message: 'Photos deleted successfully',
      });
    }
  
    return res.status(404).json({
      status: 'fail',
      message: 'Photos not found',
    });
  });
  