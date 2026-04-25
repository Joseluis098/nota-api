import JWTService from "../../infrastructure/security/jwt.service.js";

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token missing or invalid" });
    }
    try {
        const token = authHeader.split(" ")[1];
        const payload = JWTService.verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
