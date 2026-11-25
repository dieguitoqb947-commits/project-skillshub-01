import type { Request, Response } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ERROR_MESSAGES, LIMITS } from '../utils/constants.js';



export const getCurrentUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.user?.userId) 
    if(!user) {
        throw Object.assign(
            new Error(ERROR_MESSAGES.userNotFound), { statusCode: 404 }
        )
    }

    res.status(200).json({
        success: true,
        data: {
            name: user.name,
            email: user.email,
        },
        error: null,
    });
};


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as { name: string, email: string, password: string };

    if (!name || !email || !password) {
         throw Object.assign(
            new Error(ERROR_MESSAGES.requiredFields), 
            { statusCode: 400 });
    }

    if(password.length < LIMITS.passwordMinLength) {
        throw Object.assign(
            new Error(ERROR_MESSAGES.passwordMinLength), 
            { statusCode: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, LIMITS.bcryptCost);

    try {
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            success: true,
            data: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            error: null,
        });
    }catch (err: unknown) {
        if( err instanceof mongoose.mongo.MongoServerError && err.code === 11000){
            throw Object.assign(
              new Error(ERROR_MESSAGES.emailInUse),
              { statusCode: 409 }
            );
        }

    throw err;
    }
}


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string, password: string };

    if(!email || !password) {
        throw Object.assign(
            new Error(ERROR_MESSAGES.loginRequired), 
            { statusCode: 400 });
    }

    const user = await User.findOne( { email })
    if(!user) {
        throw Object.assign(
            new Error(ERROR_MESSAGES.invalidCredentials), 
            { statusCode: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        throw Object.assign(
            new Error(ERROR_MESSAGES.invalidCredentials), 
            { statusCode: 401 });
    }

    const token = jwt.sign({ userId: user._id}, env.jwtSecret, { expiresIn: LIMITS.jwtExpiresIn });
    res.status(200).json({
        success: true,
        data: {
            token,
            userId: user._id,
            name: user.name,
            email: user.email,
        },
        error: null,
    });
    
}
