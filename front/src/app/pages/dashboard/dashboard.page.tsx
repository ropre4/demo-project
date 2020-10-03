import * as React from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from 'react-query';
import './dashboard.css';
import {ILoggedUser} from "../../user/loginUser";
import {LoaderComponent} from "../../common/loader/loader.component";
import Drawer from "@material-ui/core/Drawer";

import {RestaurantFormComponent} from "../../components/restaurantForm/restaurantForm.component";
import {RestaurantService} from "../../restaurant/restaurant.service";
import {Paper, Tabs, Tab} from "@material-ui/core";
import {RestaurantTableComponent} from "../../components/restaurantTable/restaurantTable.component";
import {IRestaurant} from "../../restaurant/restaurant";
import {useEffect, useState} from "react";
import {MenuCreator} from "../../components/menuCreator/menu.creator";
import {OrderService} from "../../order/order.service";
import {OrderTableComponent} from "../../components/orderTable/orderTable.component";
import {OrderDetailsComponent} from "../../components/orderDetails/orderDetails.component";

enum DashboardTabs {
    RESTAURANTS = 0,
    ORDERS = 1
}

export interface IDashboardPageProps {
    user: ILoggedUser
}

export interface IDashboardPageDispatcher {
    deleteRestaurant: (id: number, done: Function)=>void,
    blockUser: (userId: number)=>void
}

interface Props extends IDashboardPageProps, IDashboardPageDispatcher {}

export default function DashboardPage(props: Props) {

    const {t} = useTranslation();
    const [restaurantForm, setRestaurantForm] = useState<[boolean, IRestaurant]>([false, null]);
    const [mealForm, setMealForm] = useState<[boolean, number]>([false, null]);
    const [orderDetails, setOrderDetails] = useState<[boolean, number]>([false, null]);

    const [currentTab, setCurrentTab] = useState<DashboardTabs>(DashboardTabs.RESTAURANTS);

    const restaurantList = useQuery('fetchOwnRestaurants', () => RestaurantService.fetchByOwnerId(props.user.id),
        {retry: false, enabled: false });
    const orderList = useQuery('fetchOwnerOrders', () => OrderService.fetchByOwnerId(props.user.id),
        {retry: false, enabled: false });

    useEffect(() => {
        restaurantList.refetch();
    }, []);
    const onViewMenu = (restaurantId: number) => {
        setMealForm([true, restaurantId]);
    };
    const onEdit = (restaurant: IRestaurant) => {
        setRestaurantForm([true, restaurant]);
    };
    const onCreateRestaurant = () => {
        setRestaurantForm([true, null]);
    };
    const onDelete = (restaurantId: number) => {
        if (window.confirm("Do you really want to delete this restaurant?")) {
            props.deleteRestaurant(restaurantId, restaurantList.refetch);
        }
    };
    const onViewOrderDetails = (orderId: number) => {
        setOrderDetails([true, orderId]);
    };
    const onBlockCustomer = (userId: number) => {
        if (window.confirm("Do you really want to block this user? This user will not be able to find your restaurants any longer.")) {
            props.blockUser(userId);
        }
    };
    const onTabChange = (value: DashboardTabs) => {
        setCurrentTab(value);
        switch(value){
            case DashboardTabs.RESTAURANTS:
                restaurantList.refetch();
                break;
            case DashboardTabs.ORDERS:
                orderList.refetch();
                break;
        }
    };
    const loading = false; //TODO: use

    return <div>
        {loading ? <LoaderComponent /> :
            <Paper elevation={0} className="dashboard-container">
                <Tabs
                    value={currentTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={(_, value)=>onTabChange(value)}
                >
                    <Tab label={t('dashboard_tabs:restaurants')} style={{width: '50%', fontWeight: 'bold'}} value={DashboardTabs.RESTAURANTS}/>
                    <Tab label={t('dashboard_tabs:orders')} style={{width: '50%', fontWeight: 'bold'}} value={DashboardTabs.ORDERS}/>
                </Tabs>
                {currentTab === DashboardTabs.RESTAURANTS && !restaurantList.isLoading && restaurantList.data &&
                <RestaurantTableComponent
                    list={restaurantList.data.data}
                    onViewMenu={onViewMenu}
                    isOwner={true}
                    onEdit={onEdit}
                    onCreate={onCreateRestaurant}
                    onDelete={onDelete}
                />}
                {currentTab === DashboardTabs.ORDERS && !orderList.isLoading && orderList.data &&
                <OrderTableComponent
                    list={orderList.data.data}
                    isCustomer={false}
                    onBlockCustomer={onBlockCustomer}
                    onViewDetails={onViewOrderDetails}
                />}

                <Drawer anchor="right" open={restaurantForm[0]} onClose={()=>setRestaurantForm([false, null])}>
                    <RestaurantFormComponent
                        onSubmit={()=>{
                            setRestaurantForm([false, null]);
                            restaurantList.refetch();
                        }}
                        restaurant={restaurantForm[1]}/>
                </Drawer>
                <Drawer anchor="right" open={mealForm[0]} onClose={()=>setMealForm([false, null])}>
                    <MenuCreator restaurantId={mealForm[1]}/>
                </Drawer>
                <Drawer anchor="right" open={orderDetails[0]} onClose={()=>setOrderDetails([false, null])}>
                    <OrderDetailsComponent orderId={orderDetails[1]} isCustomer={false}/>
                </Drawer>
            </Paper>
        }
    </div>
}