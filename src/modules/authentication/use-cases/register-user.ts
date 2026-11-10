import type { User } from "../entities/User";
import type { UserRepository } from "../repositories/user-repository";


export class RegisterUser {
    constructor(private userRepository: UserRepository) {}


    async execute(data: User){
        // o usuario nao pode se registrar com um email que ja existe no banco de dados.
        const userWithSameEmail = await this.userRepository.findByEmail(data.email);
        if(userWithSameEmail){
            throw new Error("User with this email already exists.");
        }
        await this.userRepository.create(data);
    }
}

