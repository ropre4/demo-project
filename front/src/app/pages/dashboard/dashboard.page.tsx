import * as React from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from 'react-query';
import './dashboard.css';
import {ILoggedUser} from "../../user/loginUser";
import {LoaderComponent} from "../../common/loader/loader.component";
import Button from "@material-ui/core/Button/Button";
import Drawer from "@material-ui/core/Drawer";

import {RestaurantFormComponent} from "../../components/restaurantForm/restaurantForm.component";
import {RestaurantService} from "../../restaurant/restaurant.service";
import {Paper} from "@material-ui/core";
import {RestaurantTableComponent} from "../../components/restaurantTable/restaurantTable.component";
import {IRestaurant} from "../../restaurant/restaurant";
import {useEffect, useState} from "react";
import {MenuContainer} from "../../components/menuContainer/menu.container";


export interface IDashboardPageProps {
    user: ILoggedUser
}

export interface IDashboardPageDispatcher {
    deleteRestaurant: (id: number, done: Function)=>void
}

interface Props extends IDashboardPageProps, IDashboardPageDispatcher {}

export default function DashboardPage(props: Props) {

    const {t} = useTranslation();
    const [restaurantForm, setRestaurantForm] = useState<[boolean, IRestaurant]>([false, null]);
    const [mealForm, setMealForm] = useState<[boolean, number]>([false, null]);

    const restaurantList = useQuery('fetchOwnRestaurants', () => RestaurantService.fetchByOwnerId(props.user.id),
        {retry: false, enabled: false });

    useEffect(() => {
        restaurantList.refetch();
    }, []);
    const onViewMenu = (restaurantId: number) => {
        setMealForm([true, restaurantId]);
    }
    const onEdit = (restaurant: IRestaurant) => {
        setRestaurantForm([true, restaurant]);
    }
    const onDelete = (restaurantId: number) => {
        if (window.confirm("Do you really want to delete this restaurant?")) {
            props.deleteRestaurant(restaurantId, restaurantList.refetch);
        }
    }
    const loading = false; //TODO: use

    return <div>
        {loading ? <LoaderComponent /> :
            <Paper elevation={0} className="dashboard-container">
                <div className="dashboard-actions">
                    <Button  variant="contained" color="secondary" onClick={()=>setRestaurantForm([true, null])}>
                        {t('dashboard:new_restaurant')}
                    </Button>
                </div>
                {!restaurantList.isLoading && restaurantList.data && <RestaurantTableComponent
                    list={restaurantList.data.data}
                    onViewMenu={onViewMenu}
                    isOwner={true}
                    onEdit={onEdit}
                    onDelete={onDelete}
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
                    <MenuContainer restaurantId={mealForm[1]}/>
                </Drawer>
            </Paper>
        }
    </div>
}