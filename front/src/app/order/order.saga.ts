import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {CreateOrderAction, CreateOrderActionFailure, CreateOrderActionSuccess, OrderActionTypes} from "./order.actions";
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

function* watchCreate() {
    yield takeLatest(OrderActionTypes.CREATE_ORDER, createOrder);
}


export default function* orderSaga() {
    yield all([
        fork(watchCreate),
    ])
};
