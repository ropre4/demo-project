import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {LoginActionFailure, LoginActionSuccess, UserActionTypes} from "./user.actions";
import {UserService} from "./user.service";

function* login() {
    try {
        yield call(UserService.login);
        yield put(new LoginActionSuccess());
    } catch (error) {
        yield put(new LoginActionFailure());
    }
}

function* watchLogin() {
    yield takeLatest(UserActionTypes.LOGIN, login);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin)
    ])
};
