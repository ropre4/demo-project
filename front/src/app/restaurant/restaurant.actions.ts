import {FailureAction, IAction} from "../user/user.actions";
import {IRestaurantForm} from "./restaurant";

export enum RestaurantActionTypes {
    CREATE_RESTAURANT = "CREATE_RESTAURANT",
    CREATE_RESTAURANT_SUCCESS = "CREATE_RESTAURANT_SUCCESS",
    CREATE_RESTAURANT_FAILURE = "CREATE_RESTAURANT_FAILURE",

    EDIT_RESTAURANT = "EDIT_RESTAURANT",
    EDIT_RESTAURANT_SUCCESS = "EDIT_RESTAURANT_SUCCESS",
    EDIT_RESTAURANT_FAILURE = "EDIT_RESTAURANT_FAILURE",

    DELETE_RESTAURANT = "DELETE_RESTAURANT",
    DELETE_RESTAURANT_SUCCESS = "DELETE_RESTAURANT_SUCCESS",
    DELETE_RESTAURANT_FAILURE = "DELETE_RESTAURANT_FAILURE",
}

export class CreateRestarantAction implements IAction {
    public readonly type = RestaurantActionTypes.CREATE_RESTAURANT;
    constructor(public restaurant: IRestaurantForm) {}
}
export class CreateRestarantActionSuccess implements IAction {
    public readonly type = RestaurantActionTypes.CREATE_RESTAURANT_SUCCESS;
}
export class CreateRestarantActionFailure extends FailureAction implements IAction {
    public readonly type = RestaurantActionTypes.CREATE_RESTAURANT_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class EditRestaurantAction implements IAction {
    public readonly type = RestaurantActionTypes.EDIT_RESTAURANT;
    constructor(public restaurant: IRestaurantForm) {}
}
export class EditRestaurantActionSuccess implements IAction {
    public readonly type = RestaurantActionTypes.EDIT_RESTAURANT_SUCCESS;
}
export class EditRestaurantActionFailure extends FailureAction implements IAction {
    public readonly type = RestaurantActionTypes.EDIT_RESTAURANT_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}

export class DeleteRestaurantAction implements IAction {
    public readonly type = RestaurantActionTypes.DELETE_RESTAURANT;
    constructor(public restaurantId: number, public done: Function) {}
}
export class DeleteRestaurantActionSuccess implements IAction {
    public readonly type = RestaurantActionTypes.DELETE_RESTAURANT_SUCCESS;
}
export class DeleteRestaurantActionFailure extends FailureAction implements IAction {
    public readonly type = RestaurantActionTypes.DELETE_RESTAURANT_FAILURE;
    constructor(public error: any) {
        super(error);
    }
}