import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
      type: String,
      required: true,
    },
    category: 
    {
        type: String,
        ref: "Category",
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ArticleReview", 
        }
    ],
    banner: {
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
    articleSchema.virtual('totalReviews').get(function() {
        const product = this;
        return product?.reviews?.length
    })
    articleSchema.virtual('averageRating').get(function() {
        let total = 0;
        const product = this;
        product?.reviews?.forEach((r) =>{
            total += r?.rating
        })
        const averageRating = Number(total/product?.reviews?.length).toFixed(1)
        return averageRating
    })


const Article = mongoose.model('Article', articleSchema);
export default Article;