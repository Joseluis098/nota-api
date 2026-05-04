/**
 * Middleware de autenticación.
 *
 * Verifica que la petición incluya el header `Authorization: Bearer <token>`.
 * Si no está, responde 401. Si está, deja `req.user` poblado y continúa.
 *
 * Nota: en esta versión académica no se valida la firma del JWT (no se ha
 * implementado el sistema de login/registro). En producción se usaría
 * `jwt.verify(token, process.env.JWT_SECRET)` con la librería ya instalada.
 */
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proveído" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token inválido" });
    }

    // En producción aquí iría: req.user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: "user_123", role: "user" };
    next();
};
