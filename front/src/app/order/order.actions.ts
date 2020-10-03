import {FailureAction, IAction} from "../user/user.actions";
import {IOrder} from "./order";

export enum OrderActionTypes {
    CREATE_ORDER = "CREATE_ORDER",
    CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS",
    CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE",

    CANCEL_ORDER = "CANCEL_ORDER",
    CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS",
    CANCEL_ORDER_FAILURE = "CANCEL_ORDER_FAILURE",

    PROCESS_ORDER = "PROCESS_ORDER",
    PROCESS_ORDER_SUCCESS = "PROCESS_ORDER_SUCCESS",
    PROCESS_ORDER_FAILURE = "PROCESS_ORDER_FAILURE",

    INROUTE_ORDER = "INROUTE_ORDER",
    INROUTE_ORDER_SUCCESS = "INROUTE_ORDER_SUCCESS",
    INROUTE_ORDER_FAILURE = "INROUTE_ORDER_FAILURE",

    DELIVER_ORDER = "DELIVER_ORDER",
    DELIVER_ORDER_SUCCESS = "DELIVER_ORDER_SUCCESS",
    DELIVER_ORDER_FAILURE = "DELIVER_ORDER_FAILURE",

    RECEIVE_ORDER = "RECEIVE_ORDER",
    RECEIVE_ORDER_SUCCESS = "RECEIVE_ORDER_SUCCESS",
    RECEIVE_ORDER_FAILURE = "RECEIVE_ORDER_FAILURE"
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

export class CancelOrderAction implements IAction {
    public readonly type = OrderActionTypes.CANCEL_ORDER;
    constructor(public orderId: number, public done: Function) {}
}
export class CancelOrderActionSuccess implements IAction {
    public readonly type = OrderActionTypes.CANCEL_ORDER_SUCCESS;
}
export class CancelOrderActionFailure extends FailureAction implements IAction {
    public readonly type = OrderActionTypes.CANCEL_ORDER_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class ProcessOrderAction implements IAction {
    public readonly type = OrderActionTypes.PROCESS_ORDER;
    constructor(public orderId: number, public done: Function) {}
}
export class ProcessOrderActionSuccess implements IAction {
    public readonly type = OrderActionTypes.PROCESS_ORDER_SUCCESS;
}
export class ProcessOrderActionFailure extends FailureAction implements IAction {
    public readonly type = OrderActionTypes.PROCESS_ORDER_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class InRouteOrderAction implements IAction {
    public readonly type = OrderActionTypes.INROUTE_ORDER;
    constructor(public orderId: number, public done: Function) {}
}
export class InRouteOrderActionSuccess implements IAction {
    public readonly type = OrderActionTypes.INROUTE_ORDER_SUCCESS;
}
export class InRouteOrderActionFailure extends FailureAction implements IAction {
    public readonly type = OrderActionTypes.INROUTE_ORDER_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class DeliverOrderAction implements IAction {
    public readonly type = OrderActionTypes.DELIVER_ORDER;
    constructor(public orderId: number, public done: Function) {}
}
export class DeliverOrderActionSuccess implements IAction {
    public readonly type = OrderActionTypes.DELIVER_ORDER_SUCCESS;
}
export class DeliverOrderActionFailure extends FailureAction implements IAction {
    public readonly type = OrderActionTypes.DELIVER_ORDER_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class ReceiveOrderAction implements IAction {
    public readonly type = OrderActionTypes.RECEIVE_ORDER;
    constructor(public orderId: number, public done: Function) {}
}
export class ReceiveOrderActionSuccess implements IAction {
    public readonly type = OrderActionTypes.RECEIVE_ORDER_SUCCESS;
}
export class ReceiveOrderActionFailure extends FailureAction implements IAction {
    public readonly type = OrderActionTypes.RECEIVE_ORDER_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}