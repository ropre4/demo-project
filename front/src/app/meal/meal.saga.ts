import {all, call, put, fork, takeLatest} from 'redux-saga/effects'
import {
    CreateMealAction,
    CreateMealActionFailure,
    CreateMealActionSuccess,
    DeleteMealAction,
    DeleteMealActionFailure,
    DeleteMealActionSuccess,
    EditMealAction,
    EditMealActionFailure,
    EditMealActionSuccess,
    MealActionTypes
} from "./meal.actions";
import {MealService} from "./meal.service";


function* createMeal(action: CreateMealAction) {
    try {
        yield call(MealService.create, action.meal, action.restaurantId);
        yield put(new CreateMealActionSuccess());
        action.done();
    } catch (error) {
        yield put(new CreateMealActionFailure(error));
    }
}
function* editMeal(action: EditMealAction) {
    try {
        yield call(MealService.edit, action.meal, action.restaurantId);
        yield put(new EditMealActionSuccess());
        action.done();
    } catch (error) {
        yield put(new EditMealActionFailure(error));
    }
}
function* deleteMeal(action: DeleteMealAction) {
    try {
        yield call(MealService.delete, action.restaurantId, action.mealId);
        yield put(new DeleteMealActionSuccess());
        action.done();
    } catch (error) {
        yield put(new DeleteMealActionFailure(error));
    }
}

function* watchCreate() {
    yield takeLatest(MealActionTypes.CREATE_MEAL, createMeal);
}
function* watchEdit() {
    yield takeLatest(MealActionTypes.EDIT_MEAL, editMeal);
}
function* watchDelete() {
    yield takeLatest(MealActionTypes.DELETE_MEAL, deleteMeal);
}

export default function* mealSaga() {
    yield all([
        fork(watchCreate),
        fork(watchEdit),
        fork(watchDelete)
    ])
};
