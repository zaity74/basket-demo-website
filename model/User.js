import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wishlist"
        }
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    shippingAddress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shippingAddress"
        }
    ],
});

const User = mongoose.model('User', userSchema);
export default User;
