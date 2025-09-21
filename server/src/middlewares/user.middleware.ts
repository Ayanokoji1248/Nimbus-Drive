import { Request, Response, NextFunction } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken"

interface JwtUserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user: JwtUserPayload
        }
    }
}

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(404).json({
                message: "Token not found",
            })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtUserPayload;

        req.user = decoded;
        next()

    } catch (error) {
        console.error(error)

    }
}

export default userMiddleware;