import {AxiosWrapper} from "../../utils/axios.wrapper";
import {IRegisterUser} from "./registerUser";
import {ILoginUser} from "./loginUser";

export class UserService {

    static async login(user: ILoginUser): Promise<any> {
        const path = "/api/user/login";
        const response = await AxiosWrapper.post(path, user);
        return response.data;
    }

    static async register(user: IRegisterUser): Promise<any> {
        const path = "/api/user";
        const response = await AxiosWrapper.post(path, user);
        return response.data;
    }
}