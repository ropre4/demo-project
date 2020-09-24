import {initialUserState, UserReducer} from "../../app/user/user.reducer";
import {LoginAction, LoginActionFailure, LoginActionSuccess} from "../../app/user/user.actions";

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
});
