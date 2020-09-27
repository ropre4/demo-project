import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {
    LoginAction,
    LoginActionFailure,
    LoginActionSuccess,
    RegisterAction, RegisterActionFailure,
    RegisterActionSuccess,
    UserActionTypes
} from "./user.actions";
import {UserService} from "./user.service";

function* login(action: LoginAction) {
    try {
        yield call(UserService.login, action.user);
        yield put(new LoginActionSuccess());
        action.done();
    } catch (error) {
        yield put(new LoginActionFailure(error));
    }
}
function* register(action: RegisterAction) {
    try {
        const response = yield call(UserService.register, action.user);
        yield put(new RegisterActionSuccess());
        action.done();
    } catch (error) {
        yield put(new RegisterActionFailure(error));
    }
}

function* watchLogin() {
    yield takeLatest(UserActionTypes.LOGIN, login);
}
function* watchRegister() {
    yield takeLatest(UserActionTypes.REGISTER, register);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchRegister)
    ])
};
