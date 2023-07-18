import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Size from '../../model/Sizes.js';
import ProductReview from '../../model/ProductReview.js';
import Category from '../../model/Category.js';
import asyncHandler from 'express-async-handler'

// @description CREATE PRODUCT *************************************************
// @route POST /api/v1/products/create-product
// @access public 

export const createProduct = asyncHandler(async (req, res) => {
    const { title, description, slug, category, countInStock, qty, price, sizes, image, user } = req.body;

    const productExist = await Product.findOne({ slug });

    if (productExist) {
        throw new Error('product already exists');
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
    const product = await Product.create({
        title,
        description,
        slug,
        countInStock,
        category,
        qty,
        price,
        user: req.userAuthId,
        sizes,
        image,
    });
    //when product create push product to category
    
    categoryFound.product.push(product._id)
    await categoryFound.save()

    /* when a product is created push all the sizes with the same category into product.sizes
    sizeFound.forEach((size) => {
        product.sizes.push(size._id);
      });
    */

    await product.save();
      

    res.status(201).json({
        status: 'success',
        message: 'product created successfully',
        data: product,
    });
});

// @description ALL PRODUCTS *************************************************
// @route GET /api/v1/products
// http://127.0.0.1:3302/api/v1/products?page=2&limit=5&&sortField=title&sortOrder=desc
// @access public 

export const getAllProducts = asyncHandler(async (req, res) => {
    let productQuery = Product.find();
  
    // search by name
    if (req.query.title) {
      productQuery = productQuery.find({ 
        title: { $regex: req.query.title, $options: 'i' } 
      });
    }
  
    // search by category
    if (req.query.category) {
      const categories = req.query.category.split(","); // Split the values by comma
      productQuery = productQuery.find({ 
        category: { $in: categories.map((cat) => new RegExp(cat, 'i')) } 
      });
    }
  
    // filter by size
    if (req.query.size) {
      productQuery = productQuery.find({ 
        sizes: { $regex: '^' + req.query.size + '$', $options: 'i' } 
      });
    }
  
    // filter by price
    if (req.query.price) {
      const priceRange = req.query.price.split("-");
      productQuery = productQuery.find({ 
        price: { $gte: priceRange[0], $lte: priceRange[1] } 
      });
    }
  
    // Sorting
    const sortField = req.query.sortField || 'title';
    const sortOrder = req.query.sortOrder || 'asc';
    const sortCriteria = {};

    if (sortField === 'title') {
        sortCriteria.title = sortOrder === 'asc' ? 1 : -1;
    } else if (sortField === 'price') {
        sortCriteria.price = sortOrder === 'asc' ? 1 : -1;
    } else if (sortField === 'createdAt') {
        sortCriteria.createdAt = sortOrder === 'asc' ? 1 : -1;
    } else if (sortField === 'rating') {
      sortCriteria.rating = sortOrder === 'asc' ? 1 : -1;
  }


  
    productQuery = productQuery.sort(sortCriteria);
  
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const total = await Product.countDocuments();
    productQuery = productQuery.skip(startIndex).limit(limit);
  
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
    const products = await productQuery
    .populate('reviews')
    .populate('photos');
  
    return res.status(200).json({
      status: 'success',
      total,
      pagination,
      results: products.length,
      products
    });
  });
  


// @description PRODUCT DETAILS *************************************************
// @route GET /api/v1/products
// @access public 

export const getProductsDetail = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findOne({_id: id})
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    })
    .populate('user')
    .populate('photos')
    .exec();

    if (!product) {
        throw new Error('product does not exist');
    }

    const productObj = product.toObject({ virtuals: true }); // Convertir l'objet produit en incluant les propriétés virtuelles

    res.status(200).json({
        status: 'success',
        product: productObj,
    });
});


// @description UPDATE PRODUCT *************************************************
// @route GET /api/v1/products/:id
// @access public 

export const updatePoduct = asyncHandler(async (req, res) => {
    const {
      title,
      description,
      slug,
      countInStock,
      qty,
      price,
      sizes,
      image,
      user,
    } = req.body;
  
    const id = req.params.id;
  
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        slug,
        countInStock,
        qty,
        price,
        sizes,
        image,
        user,
      },
      {
        new: true, // Récupérer le document mis à jour
      }
    );
  
    console.log(product);
    res.status(201).json({
      status: 'success',
      message: 'Product updated successfully',
      data: product,
    });
  });
  
// @description DELETE PRODUCT *************************************************
// @route DELETE /api/v1/products/:id
// @access public 

export const deletePoduct = asyncHandler(async (req, res) => {
  
    const id = req.params.id;
  
    const product = await Product.findByIdAndDelete(
      id,
      {
        new: true, // Récupérer le document mis à jour
      }
    );
  
    console.log(product);
    res.status(201).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: product,
    });
  });
