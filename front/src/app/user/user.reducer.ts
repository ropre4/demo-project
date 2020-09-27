import {IAction, UserActionTypes} from "./user.actions";
import * as JwtDecode from "jwt-decode";
import {ILoggedUser} from "./loginUser";

export interface UserState {
    loading: boolean,
    isLogged: boolean,
    user: ILoggedUser
}

export const initialUserState: (readLocal: boolean)=>UserState = (readLocal) => {
    let user = null;
    if(readLocal) {
        try{
            const token = localStorage.getItem('token');
            user = JwtDecode.default(token);
        } catch(e) {}
    }
   return {
       loading: false,
       isLogged: !!user,
       user: user
   }
}

export function UserReducer(state: UserState = initialUserState(true), action: IAction): UserState {
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
        case UserActionTypes.LOGOUT:
            return {...state, loading: false, isLogged: false, user: null};
        default:
            return state;
    }
}

