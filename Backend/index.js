import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import User from "./models/User.js";
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;


const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.post("/registration", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const checkResult = await User.findOne({ email });

        if (checkResult) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Try logging in."
            });
        } 

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { email: newUser.email },
        });

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    try {
        const user =  await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            secretKey,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
