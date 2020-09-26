import {IAction, UserActionTypes} from "./user.actions";

export interface UserState {
    loading: boolean,
    isLogged: boolean
}

export const initialUserState: UserState = {
    loading: false,
    isLogged: false
}

export function UserReducer(state: UserState = initialUserState, action: IAction): UserState {
    switch (action.type) {
        case UserActionTypes.LOGIN:
        case UserActionTypes.REGISTER:
            return {...state, loading: true};
        case UserActionTypes.LOGIN_SUCCESS:
            return {...state, loading: false, isLogged: true};
        case UserActionTypes.LOGIN_FAILURE:
            return {...state, loading: false, isLogged: false};
        case UserActionTypes.REGISTER_SUCCESS:
        case UserActionTypes.REGISTER_FAILURE:
            return {...state, loading: false, isLogged: false};
        default:
            return state;
    }
}

