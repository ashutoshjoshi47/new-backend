import User from  "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    
    try {

        const { name, email, password } =req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

            res.json({
                message: "User created",
                user,
            });
        
        } catch (err) {
            res.status(500).json({
                error: err.message,
            });
        }

};



//login
