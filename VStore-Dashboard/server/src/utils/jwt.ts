import { genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export function signJwt(userPayload: any, private_key: string, expiresIn?: string) {
    const payload = {
        user: userPayload,
        sub: userPayload._id
    };
    return jwt.sign(Object(payload), private_key, {
        algorithm: 'RS256',
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
        expiresIn: expiresIn
    });
}

export function verifyJwt<T>(token: string, public_key: string): T | null {
    try {
        const decoded = jwt.verify(token, public_key) as T;
        return decoded;
    } catch (error) {
        return null;
    }
}
