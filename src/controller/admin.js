const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const CreateAdmin = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const adminExist = await Admin.findOne({ email: email });

        if (adminExist) {
            return res.json({
                status: 400,
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10); //10 times hashing will happen

        const newAdmin = await Admin.create({
            email: email,
            username: username,
            password: hashedPassword
        })

        res.json({
            status: 200,
            message: "New Admin Created",
            data: newAdmin
        })
    } catch (error) {
      res.json({
        status: 400,
        message: "Internal server error"
      })
    }
}

const LoginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                status: 400,
                message: "Email and password are required"
            });
        }

        const adminExist = await Admin.findOne({ email: email }).select('+password'); //to return password field also bcz we have given select:false in model for password field

        if (!adminExist) {
            return res.json({
                status: 400,
                message: "Invalid credentials"
            });
        }

        const pwdcompare = await bcrypt.compare(password, adminExist.password);
        const jwtToken = jwt.sign({ id: adminExist._id }, process.env.JWT_SECRET, { expiresIn: "10d" });

        if (pwdcompare) {
            return res.json({
                status: 200,
                message: "Login successful",
                data: adminExist,
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

const getAdmin = async (req, res) => {
    try {

        const adminId = req.user.id;

        const admin = await Admin.findById(adminId); 
        res.json({
            status: 200,
            message: "Admin fetched successfully",
            data: admin
        });
    } catch (error) {
        console.error('Get admin error:', error);
        return res.json({
            status: 400,
            message: "Internal server error"
        });
    }
}

const updateAdmin = async (req, res) => {
    try {

        const adminId = req.user.id;    
        const updateData= req.body;
        
        const admin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });
        res.json({
            status: 200,
            message: "Admin updated successfully",
            data: admin
        });
    } catch (error) {
        console.error('Update admin error:', error);
        return res.json({
            status: 400,
            message: "Internal server error"
        });
    }
}


module.exports = {
    CreateAdmin,
    LoginAdmin,
    getAdmin,
    updateAdmin
};
