import Axios from "axios";

export class UserService {

    static async login(): Promise<any> {
        const path = "/api/";
        const response = await Axios.get(path);
        return response.data;
    }

}