import mongoose from 'mongoose';
import { LIMITS } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true },
    password: { 
        type: String, 
        required: true, 
        minlength: LIMITS.passwordMinLength, },
})

const User = mongoose.model('User', userSchema);

export default User;