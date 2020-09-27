import {all, fork} from 'redux-saga/effects';
import userSaga from "./user/user.saga";
import restaurantSaga from "./restaurant/restaurant.saga";

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(restaurantSaga)
    ])
};
