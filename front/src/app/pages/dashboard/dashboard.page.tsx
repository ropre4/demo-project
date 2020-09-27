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


export interface IDashboardPageProps {
    user: ILoggedUser
}

export interface IDashboardPageDispatcher {
}

interface Props extends IDashboardPageProps, IDashboardPageDispatcher {}

export default function DashboardPage(props: Props) {

    const {t} = useTranslation();
    const [restaurantForm, setRestaurantForm] = React.useState<boolean>(false);

    const restaurantList = useQuery('fetchOwnRestaurants',
        () => RestaurantService.fetchByOwnerId(props.user.id), {retry: false});

    const loading = false; //TODO: use

    return <div>
        {loading ? <LoaderComponent /> :
            <Paper elevation={0} className="dashboard-container">
                <div className="dashboard-actions">
                    <Button  variant="contained" color="secondary" onClick={()=>setRestaurantForm(true)}>
                        {t('dashboard:new_restaurant')}
                    </Button>
                </div>
                {!restaurantList.isLoading && <RestaurantTableComponent
                    list={restaurantList.data.data}
                    onViewMenu={()=>{}}
                    isOwner={true}
                    onEdit={()=>{}}
                    onDelete={()=>{}}
                />}
                <Drawer anchor="right" open={restaurantForm} onClose={()=>setRestaurantForm(false)}>
                    <RestaurantFormComponent onSubmit={()=>setRestaurantForm(false)} restaurant={null}/>
                </Drawer>
            </Paper>
        }
    </div>
}