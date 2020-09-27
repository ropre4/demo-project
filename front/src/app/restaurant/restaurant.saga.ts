import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {
    CreateRestarantAction,
    CreateRestarantActionFailure,
    CreateRestarantActionSuccess,
    EditRestaurantAction,
    EditRestaurantActionFailure,
    EditRestaurantActionSuccess,
    RestaurantActionTypes
} from "./restaurant.actions";
import {RestaurantService} from "./restaurant.service";

function* create(action: CreateRestarantAction) {
    try {
        yield call(RestaurantService.create, action.restaurant);
        yield put(new CreateRestarantActionSuccess());
    } catch (error) {
        yield put(new CreateRestarantActionFailure(error));
    }
}
function* edit(action: EditRestaurantAction) {
    try {
        yield call(RestaurantService.edit, action.restaurant);
        yield put(new EditRestaurantActionSuccess());
    } catch (error) {
        yield put(new EditRestaurantActionFailure(error));
    }
}

function* watchCreate() {
    yield takeLatest(RestaurantActionTypes.CREATE_RESTAURANT, create);
}
function* watchEdit() {
    yield takeLatest(RestaurantActionTypes.EDIT_RESTAURANT, edit);
}

export default function* userSaga() {
    yield all([
        fork(watchCreate),
        fork(watchEdit)
    ])
};
