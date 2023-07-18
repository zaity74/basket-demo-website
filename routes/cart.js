import express from 'express';
const cartRouter = express.Router(); 

import { addToCart, decreaseCartItem, getAllCartItem, increaseCartItem, removeFromCart } from '../controllers/cart/cartController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


cartRouter.post(`/add-to-cart/:id`, addToCart);
cartRouter.put(`/decrease/:id`, decreaseCartItem);
cartRouter.put(`/increase/:id`, increaseCartItem);
cartRouter.get('/all', getAllCartItem);
cartRouter.delete('/remove-to-cart/:id', removeFromCart);

export default cartRouter