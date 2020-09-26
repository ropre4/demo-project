import {initialUserState, UserReducer} from "../../app/user/user.reducer";
import {
    LoginAction,
    LoginActionFailure,
    LoginActionSuccess,
    RegisterAction, RegisterActionFailure,
    RegisterActionSuccess
} from "../../app/user/user.actions";
import {RegisterUser} from "../../app/user/registerUser";

describe("given UserReducer", () => {
    describe("when Login begins", () => {
        it("should begin loading", () => {
            const action = new LoginAction();
            const state = UserReducer(initialUserState, action);
            expect(state).toEqual({
                ...initialUserState,
                loading: true
            });
        });
    });
    describe("when Login is a success", () => {
        it("should set logged flag", () => {
            const action = new LoginActionSuccess();
            const state = UserReducer(initialUserState, action);
            expect(state).toEqual({
                ...initialUserState,
                loading: false,
                isLogged: true
            });
        });
    });
    describe("when Login is a failure", () => {
        it("should set logged flag", () => {
            const action = new LoginActionFailure();
            const state = UserReducer(initialUserState, action);
            expect(state).toEqual({
                ...initialUserState,
                loading: false,
                isLogged: false
            });
        });
    });
    describe("when Register begins", () => {
        it("should begin loading", () => {
            const action = new RegisterAction(RegisterUser.InitRegisterUser(), ()=>null);
            const state = UserReducer(initialUserState, action);
            expect(state).toEqual({
                ...initialUserState,
                loading: true
            });
        });
    });
    describe("when Register is a success", () => {
        it("should finish loading unlogged user", () => {
            const action = new RegisterActionSuccess();
            const state = UserReducer(initialUserState, action);
            expect(state).toEqual({
                ...initialUserState,
                loading: false,
                isLogged: false
            });
        });
    });
    describe("when Login is a failure", () => {
        it("should finish loading unlogged user", () => {
            const action = new RegisterActionFailure("some error");
            const state = UserReducer(initialUserState, action);
            expect(state).toEqual({
                ...initialUserState,
                loading: false,
                isLogged: false
            });
        });
    });
});
