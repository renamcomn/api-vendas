import { getCustomRepository } from "typeorm";

import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

interface IRequest {
    id: string;
}

class ShowUserService {
    public async execute({ id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findOne(id);

        if(user == null) {
            throw new AppError('User not found.');
        }

       return user;

    }
}

export default ShowUserService;