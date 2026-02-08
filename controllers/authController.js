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

export const login = async (req,res) => {

    try {

        const {email, password } = req.body;

        const user = await User.findOne({
            where: {email}
        });

        if (!user) {
            return res.status(400).json({
                message: "user not found"
            });
}

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.stauts(400).json ({
            message: "invalid password"
        });
    }

    const token = jwt.sign(
        { id: user.id},
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    );

    res.json({
        message: "login successful",
        token,
    });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};