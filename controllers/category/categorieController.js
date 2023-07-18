import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'

// @description CREATE CATEGORY *************************************************
// @route POST /api/v1/category/create-category
// @access public 

export const createCategory = asyncHandler(async (req, res) => {
    const { 
        name,
        type, 
        image, 
        slug 
    } = req.body;

    const isCategoryExist = await Category.findOne({ name });

    if (isCategoryExist) {
        throw new Error('category already exists');
    }

    // create product
    const category = await Category.create({
        name, 
        image,
        type,
        user: req.userAuthId,
        slug 
    });

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        data: category,
    });
});

// @description ALL CATEGORY *************************************************
// @route GET /api/v1/category/
// @access public 

export const getAllCategory = asyncHandler(async (req, res) => {

    const category = await Category.find();

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        data: category,
    });
});

// @description SINGLE CATEGORY *************************************************
// @route GET /api/v1/category/:id
// @access public 

export const getSingleCategory = asyncHandler(async (req, res) => {
    const slug = req.params.slug
    const category = await Category.findOne({ slug });

    if(!category){
        res.json({
            msg: 'category not found'
        })
    }

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        category,
    });
});


// @description UPDATE CATEGORY *************************************************
// @route PUT /api/v1/category/update-category
// @access public 

export const updateCategory = asyncHandler(async (req, res) => {
    const {
        name,
        image, 
        slug,
        type,
        product, 
        article
      } = req.body;
    
      const id = req.params.id;
    
      const category = await Category.findByIdAndUpdate(
        id,
        {
            name,
            image, 
            slug, 
            type,
            product,
            article,
            user: req.userAuthId
        },
        {
          new: true, // Récupérer le document mis à jour
        }
      );
    
      res.status(201).json({
        status: 'success',
        message: 'Product updated successfully',
        data: category,
      });
});

// @description DELETE CATEGORY *************************************************
// @route DELETE /api/v1/category/delete-category/:id
// @access public 

export const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    const category = await Category.findByIdAndDelete({ _id: id });
  
    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }
    console.log('ID:',id)
    res.status(201).json({
      status: 'success',
      message: 'Category deleted successfully',
      data: category,
    });
  });
  