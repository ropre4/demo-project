import {AxiosWrapper} from "../../utils/axios.wrapper";
import {IRegisterUser} from "./registerUser";

export class UserService {

    static async login(): Promise<any> {
        const path = "/api/";
        const response = await AxiosWrapper.get(path);
        return response.data;
    }

    static async register(user: IRegisterUser): Promise<any> {
        const path = "/api/user";
        const response = await AxiosWrapper.post(path, user);
        return response.data;
    }
}