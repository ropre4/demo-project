import {FailureAction, IAction} from "../user/user.actions";
import {IOrder} from "./order";

export enum OrderActionTypes {
    CREATE_ORDER = "CREATE_ORDER",
    CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS",
    CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE",
}

export class CreateOrderAction implements IAction {
    public readonly type = OrderActionTypes.CREATE_ORDER;
    constructor(public order: IOrder, public restaurantId: number, public done: Function) {}
}
export class CreateOrderActionSuccess implements IAction {
    public readonly type = OrderActionTypes.CREATE_ORDER_SUCCESS;
}
export class CreateOrderActionFailure extends FailureAction implements IAction {
    public readonly type = OrderActionTypes.CREATE_ORDER_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}