import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {User} from "../entities/user";
import {RegisterUserDTO} from "../dto/registerUserDTO";
import * as bcrypt from "bcrypt";

@injectable()
export class UserService {
    private readonly _userRepository: Repository<User>;

    public constructor(
        @inject(REPOSITORY_TYPE.UserRepository)userRepository: Repository<User>
    ) {
        this._userRepository = userRepository;
    }

    public async register(user: RegisterUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        return await this._userRepository.save({
            ...user,
            password: hash});
    }

}
