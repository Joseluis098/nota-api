import UserEntity from "../../../domain/entities/user.entity.js";
import HashService from "../../../infrastructure/security/hash.service.js";
import JWTService from "../../../infrastructure/security/jwt.service.js";

export default class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(data) {
        if (!data.email || !data.password) {
            throw new Error("Email and password are required");
        }
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error("User already exists");
        }
        data.password = await HashService.hash(data.password);
        const newUser = new UserEntity(data);
        return await this.userRepository.save(newUser);
    }

    async login({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isValid = await HashService.compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }
        const token = JWTService.signToken({
            id: user._id,
            email: user.email,
            role: user.role
        });
        return {
            token,
            user: { id: user._id, email: user.email, role: user.role }
        };
    }
}
