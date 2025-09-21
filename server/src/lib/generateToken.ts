import jwt from 'jsonwebtoken'

export const generateToken = async (payload: { id: string, email: string }) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string)
}