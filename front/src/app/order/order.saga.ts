import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {
    CancelOrderAction,
    CancelOrderActionFailure,
    CancelOrderActionSuccess,
    CreateOrderAction,
    CreateOrderActionFailure,
    CreateOrderActionSuccess,
    DeliverOrderAction,
    DeliverOrderActionFailure,
    DeliverOrderActionSuccess,
    InRouteOrderAction,
    InRouteOrderActionFailure,
    InRouteOrderActionSuccess,
    OrderActionTypes,
    ProcessOrderAction,
    ProcessOrderActionFailure,
    ProcessOrderActionSuccess,
    ReceiveOrderAction,
    ReceiveOrderActionFailure,
    ReceiveOrderActionSuccess
} from "./order.actions";
import {OrderService} from "./order.service";


function* createOrder(action: CreateOrderAction) {
    try {
        yield call(OrderService.create, action.order, action.restaurantId);
        yield put(new CreateOrderActionSuccess());
        action.done();
    } catch (error) {
        yield put(new CreateOrderActionFailure(error));
    }
}
function* cancelOrder(action: CancelOrderAction) {
    try {
        yield call(OrderService.cancel, action.orderId);
        yield put(new CancelOrderActionSuccess());
        action.done();
    } catch (error) {
        yield put(new CancelOrderActionFailure(error));
    }
}
function* processOrder(action: ProcessOrderAction) {
    try {
        yield call(OrderService.process, action.orderId);
        yield put(new ProcessOrderActionSuccess());
        action.done();
    } catch (error) {
        yield put(new ProcessOrderActionFailure(error));
    }
}
function* inRouteOrder(action: InRouteOrderAction) {
    try {
        yield call(OrderService.inRoute, action.orderId);
        yield put(new InRouteOrderActionSuccess());
        action.done();
    } catch (error) {
        yield put(new InRouteOrderActionFailure(error));
    }
}
function* deliverOrder(action: DeliverOrderAction) {
    try {
        yield call(OrderService.deliver, action.orderId);
        yield put(new DeliverOrderActionSuccess());
        action.done();
    } catch (error) {
        yield put(new DeliverOrderActionFailure(error));
    }
}
function* receiveOrder(action: ReceiveOrderAction) {
    try {
        yield call(OrderService.receive, action.orderId);
        yield put(new ReceiveOrderActionSuccess());
        action.done();
    } catch (error) {
        yield put(new ReceiveOrderActionFailure(error));
    }
}

function* watchCreate() {
    yield takeLatest(OrderActionTypes.CREATE_ORDER, createOrder);
}
function* watchCancel() {
    yield takeLatest(OrderActionTypes.CANCEL_ORDER, cancelOrder);
}
function* watchProcess() {
    yield takeLatest(OrderActionTypes.PROCESS_ORDER, processOrder);
}
function* watchInRoute() {
    yield takeLatest(OrderActionTypes.INROUTE_ORDER, inRouteOrder);
}
function* watchDeliver() {
    yield takeLatest(OrderActionTypes.DELIVER_ORDER, deliverOrder);
}
function* watchReceive() {
    yield takeLatest(OrderActionTypes.RECEIVE_ORDER, receiveOrder);
}
export default function* orderSaga() {
    yield all([
        fork(watchCreate),
        fork(watchCancel),
        fork(watchProcess),
        fork(watchInRoute),
        fork(watchDeliver),
        fork(watchReceive)
    ])
};
