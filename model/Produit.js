import mongoose from "mongoose";
import Photos from "./Photos.js";

const Schema = mongoose.Schema;

const produitSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: 
        {
          type: String,
          required: true,
        },
    category: 
        {
            type: String,
            ref: "Category",
            required: true
        },
    countInStock:{
        type: Number,
        required: true,
    },
    qty:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductReview", 
            required: true,
        }
    ],
    image: {
        type: String,
        required: true
    },
    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photos"
    }],
    user : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
    }, 
    { timestamps: true });

    produitSchema.virtual('totalReviews').get(function() {
        const product = this;
        return product?.reviews?.length
    })
    produitSchema.virtual('averageRating').get(function() {
        let total = 0;
        const product = this;
        product?.reviews?.forEach((r) =>{
            total += r?.rating
        })
        const averageRating = Number(total/product?.reviews?.length).toFixed(1)
        return averageRating
    })


const Produit = mongoose.model('Produit', produitSchema);
export default Produit;