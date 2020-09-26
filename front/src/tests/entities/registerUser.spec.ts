import {values, findIndex} from "ramda";
import {RegisterUser, UserRole} from "../../app/user/registerUser";

describe("given RegisterUser", () => {
    describe("when InitRegisterUser", () => {
        it("should use Customer as default role", () => {
            const sut = RegisterUser.InitRegisterUser();
            expect(sut.role).toEqual(UserRole.CUSTOMER);
        });
    });
    describe("when InitErrors", () => {
        it("should set all errors to false", () => {
            const sut = RegisterUser.InitErrors();
            expect(findIndex(el=>el!==false)(values(sut))).toEqual(-1);
        });
    });
    describe("when ValidateRegisterUser", () => {
        it("should validate passwords match", () => {
            const initUser = RegisterUser.InitRegisterUser();
            const sut = RegisterUser.ValidateRegisterUser({
                ...initUser,
                password: "password1",
                repeatPassword: "password2"
            });
            expect(sut.repeatPassword).toEqual(true);
        });
    });
});
