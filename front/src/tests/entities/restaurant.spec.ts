import {values, findIndex} from "ramda";
import {CuisineType, IRestaurant, RestaurantForm} from "../../app/restaurant/restaurant";

const testRestaurant: IRestaurant = {
    id: 10,
    ownerId: 11,
    name: "test",
    description: "testValue",
    cuisineType: CuisineType.AMERICAN
};

describe("given RestaurantForm", () => {
    describe("when InitForm is called empty", () => {
        it("should initialize form", () => {
            const sut = RestaurantForm.InitForm();
            expect(sut.id).toEqual(null);
            expect(sut.cuisineType).toEqual(null);
        });
    });
    describe("when InitForm is called with existing values", () => {
        it("should preset values", () => {
            const sut = RestaurantForm.InitForm(testRestaurant);
            expect(sut.id).toEqual(testRestaurant.id);
            expect(sut.cuisineType).toEqual(testRestaurant.cuisineType);
        });
    });
    describe("when InitErrors", () => {
        it("should set all errors to false", () => {
            const sut = RestaurantForm.InitErrors();
            expect(findIndex(el=>el!==false)(values(sut))).toEqual(-1);
        });
    });
    describe("when ValidateRestaurantForm", () => {
        it("should validate cuisine is set", () => {
            const initRestaurant = RestaurantForm.InitForm();
            const sut = RestaurantForm.ValidateRestaurantForm(initRestaurant);
            expect(sut.cuisineType).toEqual(true);
        });
    });
});
