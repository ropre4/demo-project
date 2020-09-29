import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {
    CreateRestarantAction,
    CreateRestarantActionFailure,
    CreateRestarantActionSuccess,
    DeleteRestaurantAction,
    DeleteRestaurantActionFailure,
    DeleteRestaurantActionSuccess,
    EditRestaurantAction,
    EditRestaurantActionFailure,
    EditRestaurantActionSuccess,
    RestaurantActionTypes
} from "./restaurant.actions";
import {RestaurantService} from "./restaurant.service";

function* createRestaurant(action: CreateRestarantAction) {
    try {
        yield call(RestaurantService.create, action.restaurant);
        yield put(new CreateRestarantActionSuccess());
        action.done();
    } catch (error) {
        yield put(new CreateRestarantActionFailure(error));
    }
}
function* editRestaurant(action: EditRestaurantAction) {
    try {
        yield call(RestaurantService.edit, action.restaurant);
        yield put(new EditRestaurantActionSuccess());
        action.done();
    } catch (error) {
        yield put(new EditRestaurantActionFailure(error));
    }
}
function* deleteRestaurant(action: DeleteRestaurantAction) {
    try {
        yield call(RestaurantService.delete, action.restaurantId);
        yield put(new DeleteRestaurantActionSuccess());
        action.done();
    } catch (error) {
        yield put(new DeleteRestaurantActionFailure(error));
    }
}

function* watchCreate() {
    yield takeLatest(RestaurantActionTypes.CREATE_RESTAURANT, createRestaurant);
}
function* watchEdit() {
    yield takeLatest(RestaurantActionTypes.EDIT_RESTAURANT, editRestaurant);
}
function* watchDelete() {
    yield takeLatest(RestaurantActionTypes.DELETE_RESTAURANT, deleteRestaurant);
}

export default function* userSaga() {
    yield all([
        fork(watchCreate),
        fork(watchEdit),
        fork(watchDelete)
    ])
};
