import jwt from "jsonwebtoken";

export default class JWTService {
    static signToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}
