import Product from '../../model/Produit.js';
import Article from '../../model/Article.js';
import CartItem from '../../model/CartItem.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'

// @description CREATE ARTICLE *************************************************
// @route POST /api/v1/article/create-article
// @access public 

export const createArticle = asyncHandler(async (req, res) => {
    const { 
        title, 
        content, 
        slug, 
        banner, 
        category,
        user } = req.body;

    const productExist = await Article.findOne({ slug });

    if (productExist) {
        throw new Error('article already exists');
    }

    // find category 
    const categoryFound = await Category.findOne({
        name: category
    })
    if(!categoryFound){
        res.json({
            msg: 'Category not found, please create a category or check category name'
        })
    }

    /* find sizes with the same category 
    const sizeFound = await Size.find({
        category: category
    })
    if(!sizeFound){
        res.json({
            msg: 'Size not found, please create one'
        })
    }
    */

    // create product
    const article = await Article.create({
        title,
        content,
        slug,
        category,
        user: req.userAuthId,
        banner,
    });

    //when product create push product to category
    
    categoryFound.article.push(article._id)
    await categoryFound.save()

    await article.save();
      

    res.status(201).json({
        status: 'success',
        message: 'article created successfully',
        data: article,
    });
});

// @description ALL PRODUCTS *************************************************
// @route GET /api/v1/products
// http://127.0.0.1:3302/api/v1/products?page=2&limit=5&&sortField=title&sortOrder=desc
// @access public 

export const getAllArticle = asyncHandler(async (req, res) => {
    let articleQuery = Article.find();
  
    // search by name
    if (req.query.title) {
      articleQuery = articleQuery.find({ 
        title: { $regex: req.query.title, $options: 'i' } 
      });
    }
  
    // search by category
    if (req.query.category) {
        articleQuery = articleQuery.find({ 
          category: { $regex: req.query.category, $options: 'i' } 
        });
    }

  
    // Sorting
    const sortField = req.query.sortField || 'title';
    const sortOrder = req.query.sortOrder || 'asc';
    const sortCriteria = {};

    if (sortField === 'title') {
        sortCriteria.title = sortOrder === 'asc' ? 1 : -1;
    } else if (sortField === 'createdAt') {
        sortCriteria.createdAt = sortOrder === 'asc' ? 1 : -1;
    }


  
    articleQuery = articleQuery.sort(sortCriteria);
  
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const total = await Article.countDocuments();
    articleQuery = articleQuery.skip(startIndex).limit(limit);
  
    const pagination = {};
  
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
  
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
  
    // Show products
    const article = await articleQuery
    .populate('reviews');
  
    return res.status(200).json({
      status: 'success',
      total,
      pagination,
      results: article.length,
      article
    });
  });
  


// @description PRODUCT DETAILS *************************************************
// @route GET /api/v1/products
// @access public 

export const getArticleDetail = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const article = await Article.findOne({_id: id})
    .populate('reviews')
    .populate('user')
    .exec();

    if (!article) {
        throw new Error('article does not exist');
    }

    const articleObj = article.toObject({ virtuals: true }); // Convertir l'objet produit en incluant les propriétés virtuelles

    res.status(200).json({
        status: 'success',
        article: articleObj,
    });
});


// @description UPDATE PRODUCT *************************************************
// @route GET /api/v1/products/:id
// @access public 

export const updateArticle = asyncHandler(async (req, res) => {
    const {
        title,
        content,
        slug,
        category,
        user,
        banner,
    } = req.body;
  
    const id = req.params.id;
  
    const article = await Article.findByIdAndUpdate(
      id,
      {
        title,
        content,
        slug,
        user,
        category,
        banner,
      },
      {
        new: true, // Récupérer le document mis à jour
      }
    );
  
    console.log(product);
    res.status(201).json({
      status: 'success',
      message: 'Article updated successfully',
      data: artile,
    });
  });
  
// @description DELETE PRODUCT *************************************************
// @route DELETE /api/v1/products/:id
// @access public 

export const deleteArticle = asyncHandler(async (req, res) => {
  
    const id = req.params.id;
  
    const article = await Article.findByIdAndDelete(
      id,
      {
        new: true, // Récupérer le document mis à jour
      }
    );
  
    console.log(product);
    res.status(201).json({
      status: 'success',
      message: 'article deleted successfully',
      data: article,
    });
  });
