import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articlereviewSchema = new Schema({
    article:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article", 
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

const ArticleReview = mongoose.model('ArticleReview',articlereviewSchema );
export default ArticleReview;