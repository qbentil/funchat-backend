import mongoose, { model } from "mongoose";

const USERSCHEMA = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    avatar:{
        type: String,
        default: null 
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    fullname:{
        type: String,
        default: null
    },
    about: {
        type: String,
        default: null
    },
    token :{
        type: String,
        default: null
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model<any, any>('User', USERSCHEMA);