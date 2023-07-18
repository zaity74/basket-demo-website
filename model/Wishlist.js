import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
            required: true,
        }
    ],
    name: {
        type: String,
        required: true
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
        type: String,
        required: true
    },
    user : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        }
    ],
    createdAt:{
        timestamps: true,
        toJSON: { virtuals: true }
    },

});

const WishList = mongoose.model('WishList', wishlistSchema);
export default WishList;