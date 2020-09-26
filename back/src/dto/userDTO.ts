import {UserRole} from "../../../front/src/app/user/registerUser";

export interface RegisterUserDTO {
    name: string,
    surname: string,
    email: string,
    password: string,
    role: UserRole
}

export interface LoginUserDTO {
    email: string,
    password: string
}