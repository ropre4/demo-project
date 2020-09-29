import * as React from "react";
import {useState} from "react";
import {MealFormComponent} from "../mealForm/mealForm.component";
import {useTranslation} from "react-i18next";
import {IMeal} from "../../meal/meal";
import {MealTableComponent} from "../mealTable/mealTable.component";
import {useQuery} from 'react-query';
import {MealService} from "../../meal/meal.service";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {DeleteMealAction} from "../../meal/meal.actions";

export function MenuContainer(props: {restaurantId: number}) {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [mealForm, setMealForm] = useState<[boolean, IMeal]>([false, null]);

    const mealList = useQuery('fetchRestaurantMeals', () => MealService.fetchByRestaurantId(props.restaurantId),
        {retry: false, enabled: false });

    useEffect(() => {
        mealList.refetch();
    }, [props.restaurantId]);

    const openMealForm = (meal: IMeal) => {
        setMealForm([true, meal]);
    };
    const onSubmit = () => {
        setMealForm([false, null]);
        mealList.refetch();
    };
    const onDelete = (mealId: number) => {
        if (window.confirm("Do you really want to delete this meal?")) {
            dispatch(new DeleteMealAction(props.restaurantId, mealId, mealList.refetch))
        }
    };
    return <div className="drawer-container">

        {!mealList.isLoading && mealList.data && <MealTableComponent
            list={mealList.data.data}
            isOwner={true}
            onCreate={()=>openMealForm(null)}
            onEdit={(meal: IMeal)=>openMealForm(meal)}
            onDelete={onDelete}/>}

        {mealForm[0] && <MealFormComponent onSubmit={onSubmit} onCancel={()=>setMealForm([false, null])} meal={mealForm[1]} restaurantId={props.restaurantId}/>}
    </div>
}