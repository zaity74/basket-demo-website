import ProductReview from '../../model/ProductReview.js';
import ArticleReview from '../../model/ArticleReview.js';
import Product from '../../model/Produit.js';
import Article from '../../model/Article.js';
import CartItem from '../../model/CartItem.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'

// @description CREATE REVIEWS *************************************************
// @route POST /api/v1/reviews/create-reviews
// @access public 

export const createArticleReview = asyncHandler(async (req, res) => {
    const { 
        id
    } = req.params

    const { 
        rating, 
        comment,
        article
    } = req.body

    // find Product
    const articleFound = await Article.findById(id).populate('reviews');
    if (!articleFound) {
        throw new Error('product not found');
    }

    // FIND IF USER HAVE ALREADY REVIEWED
    const hasReview = articleFound?.reviews?.find((r) => {
        return r?.author?.toString() === req?.userAuthId?.toString();
    });

    if (hasReview) {
        return res.json({
            msg: 'User has already reviewed the product'
        });
    }else{
         // create review
        const review = await ArticleReview.create({
            comment, 
            article: articleFound._id,
            rating,
            author: req.userAuthId,
        });

        articleFound.reviews.push(review?._id);
        await articleFound.save();

        res.status(201).json({
            status: 'success',
            message: 'Review created successfully',
            data: review,
        });
    }

});

// @description REMOVE REVIEWS *************************************************
// @route POST /api/v1/reviews/:id/:reviewId
// @access public 

export const deleteArticleReview = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reviewId = req.params.reviewId;
  
    // FIND THE PRODUCT
    const articleFound = await Article.findById(id);
  
    // FIND THE INDEX OF THE REVIEW INSIDE THE PRODUCT'S REVIEWS ARRAY
    const reviewIndex = articleFound?.reviews?.findIndex((r) => {
      return r?._id.toString() === reviewId.toString();
    });
  
    console.log('REVIEW ID :', id, reviewId);
  
    if (reviewIndex !== -1) {
      // REMOVE THE REVIEW FROM THE PRODUCT'S REVIEWS ARRAY
      articleFound.reviews.splice(reviewIndex, 1);
  
      // SAVE THE UPDATED PRODUCT
      await articleFound.save();
  
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
  