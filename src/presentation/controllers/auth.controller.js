export default class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    register = async (req, res) => {
        try {
            await this.authService.register(req.body);
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        try {
            const result = await this.authService.login({ email, password });
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}
