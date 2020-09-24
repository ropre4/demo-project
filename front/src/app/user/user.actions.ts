
export interface IAction<T = any> {
    type: T,
    [key: string]: any
}

export enum UserActionTypes {
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE",
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