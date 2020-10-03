import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {
    BlockUserAction,
    BlockUserActionFailure,
    BlockUserActionSuccess,
    LoginAction,
    LoginActionFailure,
    LoginActionSuccess,
    RegisterAction,
    RegisterActionFailure,
    RegisterActionSuccess,
    UserActionTypes
} from "./user.actions";
import {UserService} from "./user.service";

function* login(action: LoginAction) {
    try {
        const user = yield call(UserService.login, action.user);
        yield put(new LoginActionSuccess(user));
        action.done();
    } catch (error) {
        yield put(new LoginActionFailure(error));
    }
}
function* register(action: RegisterAction) {
    try {
        yield call(UserService.register, action.user);
        yield put(new RegisterActionSuccess());
        action.done();
    } catch (error) {
        yield put(new RegisterActionFailure(error));
    }
}
function* blockUser(action: BlockUserAction) {
    try {
        yield call(UserService.blockUser, action.userId);
        yield put(new BlockUserActionSuccess());
    } catch (error) {
        yield put(new BlockUserActionFailure(error));
    }
}

function* watchLogin() {
    yield takeLatest(UserActionTypes.LOGIN, login);
}
function* watchRegister() {
    yield takeLatest(UserActionTypes.REGISTER, register);
}
function* watchUserBlock() {
    yield takeLatest(UserActionTypes.BLOCK_USER, blockUser);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchRegister),
        fork(watchUserBlock)
    ])
};
