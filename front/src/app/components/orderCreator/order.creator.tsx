import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {IMeal} from "../../meal/meal";
import {MealTableComponent} from "../mealTable/mealTable.component";
import {useQuery} from 'react-query';
import {MealService} from "../../meal/meal.service";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

export function OrderCreator(props: {restaurantId: number}) {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const mealList = useQuery('fetchRestaurantMeals', () => MealService.fetchByRestaurantId(props.restaurantId),
        {retry: false, enabled: false });

    useEffect(() => {
        mealList.refetch();
    }, [props.restaurantId]);


    return <div className="drawer-container">

        {!mealList.isLoading && mealList.data && <MealTableComponent
            list={mealList.data.data}
            isOwner={false}
            onCreate={null}
            onEdit={null}
            onDelete={null}
            onAddToOrder={()=>{}}/>}
    </div>
}