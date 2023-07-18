import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sizeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    product:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
        }
    ],
    user : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        }
    ],

});

const Size = mongoose.model('Size', sizeSchema);
export default Size;