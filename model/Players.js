import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
        type: String,
        required: true
      },
    slug: {
        type: String,
        required: true
    },
    nationalite: {
        type: String,
        required: true
    },
    playerNum: {
        type: Number,
        required: true
    },
    age: {
      type: Number,
      required: true,
    },
    position: 
    {
        type: String,
        ref: "Category",
        required: true
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


const Player = mongoose.model('Player', playerSchema);
export default Player;