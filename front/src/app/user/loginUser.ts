import {isEmpty} from 'ramda';

export interface ILoginUser {
    email: string,
    password: string
}
export interface ILoginUserErrors {
    email: boolean,
    password: boolean
}
export class LoginUser {

    static InitLoginUser(): ILoginUser {
        return {
            email: "",
            password: ""
        }
    }

    static InitErrors(): ILoginUserErrors {
        return {
            email: false,
            password: false
        }
    }

    static ValidateLoginUser(user: ILoginUser): ILoginUserErrors {
        return {
            email: isEmpty(user.email),
            password: isEmpty(user.password)
        }
    }

}