import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config(); 


declare module 'express-serve-static-core' {
    interface Request {
        userData?: JwtPayload | string;
    }
}


export const CreateJWTToken = (data: any = {}): string => {
    const tokenData = { ...data };
    return jwt.sign(tokenData, process.env.jwtSecretKey as string, { expiresIn: '1h' });
};


export const checkSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['token'] as string; 

    if (!token || !token.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
        return;
    }

    try {
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.jwtSecretKey as string) as JwtPayload;

        req.userData = decodedToken;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
};
