import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    phonenumber: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verifiedAccount: {
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: Number
    },
    isFirstTime: {
        type: Boolean
    },
    restorePasswordCode: {
        type: Number
    },
    username: {
        type: String,
        minlength: 4,
        maxlength: 25
    },
    uploadFolder: {
        type: String,
        unique: true
    }
});

export default mongoose.model('user', UserSchema)