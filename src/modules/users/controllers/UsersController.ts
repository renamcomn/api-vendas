import { hash } from "bcryptjs";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();

        const users = await listUsers.execute();

        return response.json(users);
    }

    public async create(request: Request, response: Response): Promise<Response>  {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const hashedPassword = await hash(password, 8);
        const user = await createUser.execute({
            name,
            email,
            password: hashedPassword
        });

        return response.json(user);
    }
}