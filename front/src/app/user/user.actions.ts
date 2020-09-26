import {IRegisterUser} from "./registerUser";

export interface IAction<T = any> {
    type: T,
    [key: string]: any
}

export class FailureAction {
    constructor(public error) {
        console.log(error);
    }
}

export enum UserActionTypes {
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE",

    REGISTER = "REGISTER",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAILURE = "REGISTER_FAILURE",
}

export class LoginAction implements IAction {
    public readonly type = UserActionTypes.LOGIN;
}
export class LoginActionSuccess implements IAction {
    public readonly type = UserActionTypes.LOGIN_SUCCESS;
}
export class LoginActionFailure implements IAction {
    public readonly type = UserActionTypes.LOGIN_FAILURE;
}

export class RegisterAction implements IAction {
    public readonly type = UserActionTypes.REGISTER;
    constructor(public user: IRegisterUser, public done: Function) {
    }
}
export class RegisterActionSuccess implements IAction {
    public readonly type = UserActionTypes.REGISTER_SUCCESS;
}
export class RegisterActionFailure extends FailureAction implements IAction {
    public readonly type = UserActionTypes.REGISTER_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}