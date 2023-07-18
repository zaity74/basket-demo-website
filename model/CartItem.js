import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
            required: true,
        }
    ],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        }
    ],
    qty:{
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
    }, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);
export default Cart;