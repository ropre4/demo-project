import {values, findIndex} from "ramda";
import {LoginUser} from "../../app/user/loginUser";

describe("given LoginUser", () => {
    describe("when InitLoginUser", () => {
        it("should set values to empty", () => {
            const sut = LoginUser.InitLoginUser();
            expect(findIndex(el=>el!=="")(values(sut))).toEqual(-1);
        });
    });
    describe("when InitErrors", () => {
        it("should set all errors to false", () => {
            const sut = LoginUser.InitErrors();
            expect(findIndex(el=>el!==false)(values(sut))).toEqual(-1);
        });
    });
    describe("when ValidateLoginUser", () => {
        it("should validate values not empty", () => {
            const initUser = LoginUser.InitLoginUser();
            const sut = LoginUser.ValidateLoginUser(initUser);
            expect(sut.email).toEqual(true);
            expect(sut.password).toEqual(true);
        });
    });
});
