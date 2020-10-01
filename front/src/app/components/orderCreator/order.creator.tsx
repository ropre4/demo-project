import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {IMeal} from "../../meal/meal";
import {MealTableComponent} from "../mealTable/mealTable.component";
import {useQuery} from 'react-query';
import {MealService} from "../../meal/meal.service";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {IOrder, IOrderLine, Order} from "../../order/order";
import {OrderDetailsComponent} from "../orderDetails/orderDetails.component";
import {CreateOrderAction} from "../../order/order.actions";

export function OrderCreator(props: {
    restaurantId: number,
    onSubmit: Function
}) {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [order, setOrder] = useState<IOrder>(Order.InitOrder());

    const mealList = useQuery('fetchRestaurantMeals', () => MealService.fetchByRestaurantId(props.restaurantId),
        {retry: false, enabled: false });


    useEffect(() => {
        if(props.restaurantId) mealList.refetch();
    }, [props.restaurantId]);


    const handleAddToOrder = (meal: IMeal, amount: number) => {
        setOrder(Order.AddLine(order, meal, amount));
    };
    const handlePlaceOrder = (order: IOrder, restaurantId: number) => {
        dispatch(new CreateOrderAction(order, restaurantId, props.onSubmit))
    };
    return <div className="drawer-container">
        {!mealList.isLoading && mealList.data && <MealTableComponent
            list={mealList.data.data}
            isOwner={false}
            onCreate={null}
            onEdit={null}
            onDelete={null}
            onAddToOrder={handleAddToOrder}/>}
            <div style={{height: 50}}/>
        {order.lines && order.lines.length > 0 && <OrderDetailsComponent
            onPlaceOrder={()=>handlePlaceOrder(order, props.restaurantId)} order={order} isClient={true}/>}
    </div>
}