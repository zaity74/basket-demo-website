import mongoose from "mongoose";

const Schema = mongoose.Schema;

const photosSchema = new Schema({
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
            required: true,
        }
    ],
    image: {
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

});

const Photos = mongoose.model('Photos', photosSchema);
export default Photos;