import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionService {
    public async execute({ email, password } : IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Incorrect Email/Password combination.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed) {
            throw new AppError('Incorrect Email/Password combination.', 401);
        }

        const token = sign({}, '44cf8fcfb482e335e8406f5da18f5e0a', {
            subject: user.id,
            expiresIn: '1d'
        });

        return {
            user,
            token
        };
    }
}

export default CreateSessionService;