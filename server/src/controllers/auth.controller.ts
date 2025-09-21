import { Request, Response, NextFunction } from "express";
import { email, z } from "zod"
import User from "../models/user.model";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
import { generateToken } from "../lib/generateToken";

const userRegisterSchema = z.object({
    username: z.string().min(5, "Atleast 5 character").trim(),
    email: z.string().email("Invalid Email").trim(),
    password: z.string().min(5, "Atleast 5 character").trim()
})

const userLoginSchema = userRegisterSchema.pick({
    email: true,
    password: true,
})

export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, email, password } = req.body;

        const userParse = userRegisterSchema.safeParse({ username, email, password });

        if (!userParse.success) {
            res.status(400).json({
                errors: userParse.error.flatten().fieldErrors
            })
            return
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            res.status(400).json({
                message: "Email already taken"
            })
            return
        }

        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save();
        const token = await generateToken({ id: user._id.toString(), email: user.email })
        res.cookie("token", token)

        const { password: _, ...userData } = user.toObject()

        res.status(201).json({
            message: "Registeration Successfull",
            user: userData,
            token
        })
        return


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, password } = req.body;

        const userParse = userLoginSchema.safeParse({ email, password });

        if (!userParse.success) {
            res.status(400).json({
                errors: userParse.error.flatten().fieldErrors
            })
            return
        }

        const userExist = await User.findOne({ email });

        if (!userExist) {
            res.status(400).json({
                message: "Invalid Credential"
            })
            return
        }

        const validPass = await bcrypt.compare(password, userExist.password);

        if (!validPass) {
            res.status(400).json({
                message: "Invalid Credential"
            })
            return
        }

        const token = await generateToken({ id: userExist._id.toString(), email: userExist.email })
        res.cookie("token", token);

        const { password: _, ...userData } = userExist.toObject()

        res.status(200).json({
            message: "User Login successfull",
            user: userData
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}