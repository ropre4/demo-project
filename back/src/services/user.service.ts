import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {User, UserSensitiveFields} from "../entities/user";
import {LoginUserDTO, RegisterUserDTO} from "../dto/userDTO";
import {omit} from "ramda";
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

    public async login(user: LoginUserDTO): Promise<User> {
        const fromDB: User = await this._userRepository.findOne({email: user.email});
        if(!fromDB) throw new Error("No user found");

        const isCorrectPassword: boolean = await bcrypt.compare(user.password, fromDB.password);
        if(!isCorrectPassword) throw new Error("Wrong Password");

        return omit(UserSensitiveFields, fromDB);
    }

}
