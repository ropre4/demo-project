import {Order} from "../../app/order/order";
import {IMeal} from "../../app/meal/meal";

const meal1: Partial<IMeal> = {id:1, price: 10};
const meal2: Partial<IMeal> = {id:2, price: 12};

describe("given Order", () => {
    describe("when InitOrder is called", () => {
        it("should initialize", () => {
            const sut = Order.InitOrder();
            expect(sut.total).toEqual(0);
            expect(sut.lines.length).toEqual(0);

        });
    });
    describe("when AddLine is called", () => {
        it("should addLine", () => {
            const order = Order.InitOrder();
            const sut = Order.AddLine(order, meal1 as IMeal, 3);
            expect(sut.total).toEqual(30);
            expect(sut.lines.length).toEqual(1);

        });
    });
    describe("when AddLine is called with 2 different items", () => {
        it("should add 2 lines", () => {
            let order = Order.InitOrder();
            order = Order.AddLine(order, meal1 as IMeal, 3);
            order = Order.AddLine(order, meal2 as IMeal, 1);
            expect(order.total).toEqual(42);
            expect(order.lines.length).toEqual(2);

        });
    });
    describe("when AddLine is called with same item twice", () => {
        it("should reduce to one line", () => {
            let order = Order.InitOrder();
            order = Order.AddLine(order, meal1 as IMeal, 3);
            order = Order.AddLine(order, meal1 as IMeal, 1);
            expect(order.total).toEqual(40);
            expect(order.lines.length).toEqual(1);

        });
    });
});
