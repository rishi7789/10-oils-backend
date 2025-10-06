const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const uploadImages = require('../utils/uploadImages')

const CreateUser = async (req, res) => {
    try {
        const { email, phone, username, password } = req.body;

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.json({
                status: 400,
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10); //10 times hashing will happen

        const newUser = await User.create({
            email: email,
            phone: phone,
            username: username,
            password: hashedPassword
        })

        res.json({
            status: 200,
            message: "Registration successful",
            data: newUser
        })
    } catch (error) {
        console.log(error)
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                status: 400,
                message: "Email and password are required"
            });
        }

        const userExist = await User.findOne({ email: email }).select('+password'); //to return password field also bcz we have given select:false in model for password field

        if (!userExist) {
            return res.json({
                status: 400,
                message: "Invalid credentials"
            });
        }

        const pwdcompare = await bcrypt.compare(password, userExist.password);
        const jwtToken = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "10d" });

        if (pwdcompare) {
            return res.json({
                status: 200,
                message: "Login successful",
                data: userExist,
                token: jwtToken
            });
        } else {
            return res.json({
                status: 400,
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.json({
            status: 400,
            message: "Internal server error"
        });
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.user.id; //from tokenAuth
        const user = await User.findById(userId);


        if (!user) {
            return res.json({
                status: 400,
                message: "User not found"
            });
        }

        res.json({
            status: 200,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        console.error('Get user error:', error);
        return res.json({
            status: 400,
            message: "Internal server error"
        });
    }
}

const uploadUserImage = async (req, res) => {
    try {

        const imageUrl = await uploadImages(req.file);


        res.status(200).json({
            message: 'Image uploaded',
            imageUrl: imageUrl
        });
    } catch (error) {
        console.error('S3 upload error:', error);
        res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email, username, phone, address, userImage } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { email, username, phone, address, userImage }, { new: true });
        res.json({
            status: 200,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error('Update user error:', error);
        return res.json({
            status: 400,
            message: "Internal server error"
        });
    }
}


module.exports = {
    CreateUser,
    LoginUser,
    getUser,
    updateUser,
    uploadUserImage
};
