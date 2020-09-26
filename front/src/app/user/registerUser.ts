import {isEmpty} from 'ramda';

export enum UserRole {
    CUSTOMER = 0,
    RESTAURANT_OWNER = 1
}

export interface IRegisterUser {
    name: string,
    surname: string,
    email: string,
    password: string,
    repeatPassword: string,
    role: UserRole
}
export interface IRegisterUserErrors {
    name: boolean,
    surname: boolean,
    email: boolean,
    password: boolean,
    repeatPassword: boolean
}
export class RegisterUser {

    static InitRegisterUser(): IRegisterUser {
        return {
            name: "",
            surname: "",
            email: "",
            password: "",
            repeatPassword: "",
            role: UserRole.CUSTOMER
        }
    }

    static InitErrors(): IRegisterUserErrors {
        return {
            name: false,
            surname: false,
            email: false,
            password: false,
            repeatPassword: false
        }
    }

    static ValidateRegisterUser(user: IRegisterUser): IRegisterUserErrors {
        return {
            name: isEmpty(user.name),
            surname: isEmpty(user.surname),
            email: isEmpty(user.email),
            password: isEmpty(user.password),
            repeatPassword: user.password !== user.repeatPassword
        }
    }

}