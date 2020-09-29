import {FailureAction, IAction} from "../user/user.actions";
import {IMealForm} from "./meal";

export enum MealActionTypes {
    CREATE_MEAL = "CREATE_MEAL",
    CREATE_MEAL_SUCCESS = "CREATE_MEAL_SUCCESS",
    CREATE_MEAL_FAILURE = "CREATE_MEAL_FAILURE",

    EDIT_MEAL = "EDIT_MEAL",
    EDIT_MEAL_SUCCESS = "EDIT_MEAL_SUCCESS",
    EDIT_MEAL_FAILURE = "EDIT_MEAL_FAILURE",

    DELETE_MEAL = "DELETE_MEAL",
    DELETE_MEAL_SUCCESS = "DELETE_MEAL_SUCCESS",
    DELETE_MEAL_FAILURE = "DELETE_MEAL_FAILURE",
}

export class CreateMealAction implements IAction {
    public readonly type = MealActionTypes.CREATE_MEAL;
    constructor(public meal: IMealForm, public restaurantId: number, public done: Function) {}
}
export class CreateMealActionSuccess implements IAction {
    public readonly type = MealActionTypes.CREATE_MEAL_SUCCESS;
}
export class CreateMealActionFailure extends FailureAction implements IAction {
    public readonly type = MealActionTypes.CREATE_MEAL_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class EditMealAction implements IAction {
    public readonly type = MealActionTypes.EDIT_MEAL;
    constructor(public meal: IMealForm, public restaurantId: number, public done: Function) {}
}
export class EditMealActionSuccess implements IAction {
    public readonly type = MealActionTypes.EDIT_MEAL_SUCCESS;
}
export class EditMealActionFailure extends FailureAction implements IAction {
    public readonly type = MealActionTypes.EDIT_MEAL_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class DeleteMealAction implements IAction {
    public readonly type = MealActionTypes.DELETE_MEAL;
    constructor(public restaurantId: number, public mealId: number, public done: Function) {}
}
export class DeleteMealActionSuccess implements IAction {
    public readonly type = MealActionTypes.DELETE_MEAL_SUCCESS;
}
export class DeleteMealActionFailure extends FailureAction implements IAction {
    public readonly type = MealActionTypes.DELETE_MEAL_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}