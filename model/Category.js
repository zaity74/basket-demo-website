import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    product:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
            required: true,
        }
    ],
    article:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article", 
        }
    ],
    user : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        }
    ],
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },

});

const Category = mongoose.model('Category', categorySchema);
export default Category;