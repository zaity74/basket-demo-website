import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user: [
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
},
{ timestamps: true }

);

const Media = mongoose.model('Media', mediaSchema);
export default Media;