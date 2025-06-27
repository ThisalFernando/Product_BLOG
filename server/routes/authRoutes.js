const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

//Sign in user
router.post("/register", async (req,res) => {
    const {name, email, password, role} = req.body;
    
    try{
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedPassword, role});
        res.status(201).json({message: "User is created!"});
    }catch(err){
        console.error("Registration error:", err);
        res.status(400).json({message: "Error creating user!"});
    }
});

//Login user
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    try{
        if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({message: "Invalid credentials!"});
        }

        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({message: "Login Successful!", 
            token,
            user: {id: user._id, name: user.name, email: user.email, role: user.role}
        });
    }catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error logging in!" });
    }
    
});


module.exports = router;