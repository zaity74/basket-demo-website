import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productreviewSchema = new Schema({
    product:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
            required: true,
        }
    ],
    author: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        }
    ],
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
    comment: {
      type: String,
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


const ProductReview = mongoose.model('ProductReview', productreviewSchema);
export default ProductReview;