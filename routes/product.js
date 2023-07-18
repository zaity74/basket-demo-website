import express from 'express';
const productRouter = express.Router(); 

import { 
    createProduct, 
    deletePoduct, 
    getAllProducts, 
    getProductsDetail, 
    updatePoduct} 
    from '../controllers/product/productController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

productRouter.post('/create-product', isLoggedIn, createProduct);
productRouter.get(`/:id`, getProductsDetail);
productRouter.put(`/:id`, isLoggedIn, updatePoduct);
productRouter.delete(`/:id/delete`, isLoggedIn, deletePoduct);
productRouter.get('/', getAllProducts);

export default productRouter