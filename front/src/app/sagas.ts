import {all, fork} from 'redux-saga/effects';
import userSaga from "./user/user.saga";
import mealSaga from "./meal/meal.saga";
import restaurantSaga from "./restaurant/restaurant.saga";

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(mealSaga),
        fork(restaurantSaga)
    ])
};
