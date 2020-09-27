import {initialUserState, UserReducer} from "../../app/user/user.reducer";
import {
    LoginAction,
    LoginActionFailure,
    LoginActionSuccess, LogoutAction,
    RegisterAction, RegisterActionFailure,
    RegisterActionSuccess
} from "../../app/user/user.actions";
import {RegisterUser} from "../../app/user/registerUser";
import {LoginUser} from "../../app/user/loginUser";

const initialState = initialUserState(false);

describe("given UserReducer", () => {
    describe("when Login begins", () => {
        it("should begin loading", () => {
            const action = new LoginAction(LoginUser.InitLoginUser(), null);
            const state = UserReducer(initialState, action);
            expect(state).toEqual({
                ...initialState,
                loading: true
            });
        });
    });
    describe("when Login is a success", () => {
        it("should set logged flag", () => {
            const action = new LoginActionSuccess();
            const state = UserReducer(initialState, action);
            expect(state).toEqual({
                ...initialState,
                loading: false,
                isLogged: true
            });
        });
    });
    describe("when Login is a failure", () => {
        it("should set logged flag", () => {
            const action = new LoginActionFailure();
            const state = UserReducer(initialState, action);
            expect(state).toEqual({
                ...initialState,
                loading: false,
                isLogged: false
            });
        });
    });
    describe("when Register begins", () => {
        it("should begin loading", () => {
            const action = new RegisterAction(RegisterUser.InitRegisterUser(), ()=>null);
            const state = UserReducer(initialState, action);
            expect(state).toEqual({
                ...initialState,
                loading: true
            });
        });
    });
    describe("when Register is a success", () => {
        it("should finish loading unlogged user", () => {
            const action = new RegisterActionSuccess();
            const state = UserReducer(initialState, action);
            expect(state).toEqual({
                ...initialState,
                loading: false,
                isLogged: false
            });
        });
    });
    describe("when Login is a failure", () => {
        it("should finish loading unlogged user", () => {
            const action = new RegisterActionFailure("some error");
            const state = UserReducer(initialState, action);
            expect(state).toEqual({
                ...initialState,
                loading: false,
                isLogged: false
            });
        });
    });
    describe("when Logout", () => {
        it("should erase user info", () => {
            const action = new LogoutAction();
            const state = UserReducer(initialState, action);
            expect(state).toEqual({
                ...initialState,
                loading: false,
                isLogged: false,
                user: null
            });
        });
    });
});
