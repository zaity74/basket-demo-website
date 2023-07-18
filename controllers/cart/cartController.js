import Product from '../../model/Produit.js';
import CartItem from '../../model/CartItem.js';
import Size from '../../model/Sizes.js';
import asyncHandler from 'express-async-handler'

// @description ADD TO CART *************************************************
// @route POST /api/v1/cart/add-to-cart
// @access public 

export const addToCart = asyncHandler(async (req, res) => {
    const id = req.params.id; // Utilisez req.params.slug pour obtenir le slug à partir de l'URL
    const { title, price, image, user, slug } = req.body;
    const qty = req.body.qty || 1

    // Récuprer le produit en fonction du slug 
    const product = await Product.findById({ _id : id });

    /* Récupérer la taille d'un produit
    const singleSize = await Size.findOne({ name: sizes });
    */
    // Récupérer ou créer un objet CartItem
    let cartItem = await CartItem.findOne({ product });

    if (cartItem) {
        cartItem.qty += qty;
        await cartItem.save();
        return res.status(400).json({
            status: 'fail',
            message: 'Product already exists',
            data: cartItem,
            qty: cartItem.qty
        });
    }else {
        // create user 
        cartItem = await CartItem.create({
            product,
            user: req.userAuthId,
            name: product.title,
            price: product.price,
            slug: product.slug,
            image: product.image,
            qty,
        });

        console.log('USER:', cartItem.user);

        await cartItem.save()
        return res.status(201).json({
            status: 'success',
            message: 'Product successfully added to the cart',
            data: cartItem,
            qty: cartItem.qty
        });
    }
        
});

// @description REMOVE ITEM TO  CART *************************************************
// @route DELETE /api/v1/cart/remove-to-cart/:id
// @access public 

export const removeFromCart = asyncHandler(async (req, res) => {
    const id = req.params.id; // Utilisez req.body.id pour utiliser l'id de l'item
    const qty = req.body.qty || 1

    console.log('ID : ',id)
    // Récupérer ou créer un objet CartItem
    const cartItem = await CartItem.findByIdAndUpdate(id, { qty: 0 }, { new: true });
    const removedItem = await CartItem.findByIdAndRemove(id, { new: true });
    console.log('produit supprimer',removedItem.qty)

    if (!cartItem) {
        return res.status(404).json({
          status: 'fail',
          message: 'Cart item not found',
          removedItem
        });
    }
    
    return res.status(201).json({
        status: 'success',
        message: 'Product successfully deleted to the cart'
    });
    }
        
);

// @description ALL CARTITEM *************************************************
// @route GET /api/v1/cartItem
// @access public 

export const getAllCartItem = asyncHandler(async (req, res) => {
    const cartItem = await CartItem.find()
    if(cartItem.length === 0){
        res.json({
            msg: 'cart is empty'
        })
    }else{
        let totalItem = cartItem.length;
        let totalPrice = 0;
        cartItem.forEach((cartItem) => {
        totalPrice += cartItem.qty * cartItem.price;
        });
        return res.status(200).json({
            status: 'succes',
            cartItem,
            totalPrice,
            totalItem,
        })
    }
});

// @description INCREASE QTY CARTITEM *************************************************
// @route GET /api/v1/cart/increase/:id
// @access public 

export const increaseCartItem = asyncHandler(async (req, res) => {
    const id = req.params.id; // Utilisez req.body.id pour utiliser l'id de l'item
  
    // Récupérer le cartItem correspondant à l'id
    const cartItem = await CartItem.findById(id);
  
    if (!cartItem) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart item not found',
      });
    }
  
    // Augmenter la quantité du cartItem
    cartItem.qty += 1;
    await cartItem.save();
  
    return res.status(200).json({
      status: 'success',
      message: 'Cart item quantity increased',
      data: cartItem,
    });
  });

// @description DECREASE QTY CARTITEM *************************************************
// @route GET /api/v1/cart/decrease/:id
// @access public 
export const decreaseCartItem = asyncHandler(async (req, res) => {
    const id = req.params.id; // Utilisez req.body.id pour utiliser l'id de l'item

    // Récupérer le cartItem correspondant à l'id
    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
        return res.status(404).json({
        status: 'fail',
        message: 'Cart item not found',
        });
    }

    // Vérifier si la quantité est inférieure ou égale à 1
    if (cartItem.qty <= 1) {
        // Supprimer le cartItem
        await CartItem.deleteOne({ _id: id });

        return res.status(200).json({
        status: 'success',
        message: 'Cart item removed',
        });
    }else{
          // Diminuer la quantité du cartItem
        cartItem.qty -= 1;
        await cartItem.save();

        return res.status(200).json({
            status: 'success',
            message: 'Cart item quantity decreased',
            data: cartItem,
        });
    }
});
  
  