import ProductReview from '../../model/ProductReview.js';
import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'

// @description CREATE REVIEWS *************************************************
// @route POST /api/v1/reviews/create-reviews
// @access public 

export const createReviews = asyncHandler(async (req, res) => {
    const { 
        id
    } = req.params

    const { 
        rating, 
        comment,
        product
    } = req.body

    // find Product
    const productFound = await Product.findById(id).populate('reviews');
    if (!productFound) {
        throw new Error('product not found');
    }

    // FIND IF USER HAVE ALREADY REVIEWED
    const hasReview = productFound?.reviews?.find((r) => {
        return r?.author?.toString() === req?.userAuthId?.toString();
    });

    if (hasReview) {
        return res.json({
            msg: 'User has already reviewed the product'
        });
    }else{
         // create review
        const review = await ProductReview.create({
            comment, 
            product: productFound._id,
            rating,
            author: req.userAuthId,
        });

        // Charger les informations de l'utilisateur associé à l'avis
        await review.populate('author');

        productFound.reviews.push(review?._id);
        await productFound.save();

        res.status(201).json({
            status: 'success',
            message: 'Review created successfully',
            data: review
        });
    }

});

// @description REMOVE REVIEWS *************************************************
// @route POST /api/v1/reviews/:id/:reviewId
// @access public 

export const deleteReviews = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reviewId = req.params.reviewId;
  
    // FIND THE PRODUCT
    const productFound = await Product.findById(id);
  
    // FIND THE INDEX OF THE REVIEW INSIDE THE PRODUCT'S REVIEWS ARRAY
    const reviewIndex = productFound?.reviews?.findIndex((r) => {
      return r?._id.toString() === reviewId.toString();
    });
  
    console.log('REVIEW ID :', id, reviewId);
  
    if (reviewIndex !== -1) {
      // REMOVE THE REVIEW FROM THE PRODUCT'S REVIEWS ARRAY
      productFound.reviews.splice(reviewIndex, 1);
  
      // SAVE THE UPDATED PRODUCT
      await productFound.save();
  
      return res.status(200).json({
        status: 'success',
        message: 'Review deleted successfully',
      });
    }
  
    return res.status(404).json({
      status: 'fail',
      message: 'Review not found',
    });
  });
  