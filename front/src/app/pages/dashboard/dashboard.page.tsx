import * as React from "react";
import {useTranslation} from "react-i18next";
import './dashboard.css';
import {ILoggedUser} from "../../user/loginUser";
import {LoaderComponent} from "../../common/loader/loader.component";
import Button from "@material-ui/core/Button/Button";
import Drawer from "@material-ui/core/Drawer";

import {RestaurantFormComponent} from "../../components/restaurantForm/restaurantForm.component";


export interface IDashboardPageProps {
    user: ILoggedUser
}

export interface IDashboardPageDispatcher {
}

interface Props extends IDashboardPageProps, IDashboardPageDispatcher {}

export default function DashboardPage(props: Props) {

    const {t} = useTranslation();
    const [restaurantForm, setRestaurantForm] = React.useState<boolean>(false);

    const loading = false; //TODO: use

    return <div>
        {loading ? <LoaderComponent /> :
            <div className="dashboard-container">
                <div className="dashboard-actions">
                    <Button  variant="contained" color="secondary" onClick={()=>setRestaurantForm(true)}>
                        {t('dashboard:new_restaurant')}
                    </Button>
                </div>



                <Drawer anchor="right" open={restaurantForm} onClose={()=>setRestaurantForm(false)}>
                    <RestaurantFormComponent onSubmit={()=>setRestaurantForm(false)} restaurant={null}/>
                </Drawer>
            </div>
        }
    </div>
}