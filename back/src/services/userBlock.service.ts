import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {omit} from "ramda";
import {UserBlock} from "../entities/userBlock";

@injectable()
export class UserBlockService {
    private readonly _userBlockRepository: Repository<UserBlock>;

    public constructor(
        @inject(REPOSITORY_TYPE.UserBlockRepository)userBlockRepository: Repository<UserBlock>
    ) {
        this._userBlockRepository = userBlockRepository;
    }

    public async block(ownerId: number, userId: number): Promise<UserBlock> {
        return await this._userBlockRepository.save({
            ownerId: ownerId,
            userId: userId
        });
    }

    public async findByUserId(userId: number): Promise<UserBlock[]> {
        return await this._userBlockRepository.find({userId: userId});
    }
}
