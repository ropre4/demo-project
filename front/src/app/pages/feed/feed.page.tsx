import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from 'react-query';
import './feed.css';
import {ILoggedUser} from "../../user/loginUser";
import {LoaderComponent} from "../../common/loader/loader.component";
import {RestaurantService} from "../../restaurant/restaurant.service";
import {Paper, Drawer} from "@material-ui/core";
import {RestaurantTableComponent} from "../../components/restaurantTable/restaurantTable.component";
import {useEffect} from "react";
import {OrderCreator} from "../../components/orderCreator/order.creator";


export interface IFeedPageProps {
    user: ILoggedUser
}

export interface IFeedPageDispatcher {
}

interface Props extends IFeedPageProps, IFeedPageDispatcher {}

export default function FeedPage(props: Props) {

    const {t} = useTranslation();
    const [orderForm, setOrderForm] = useState<[boolean, number]>([false, null]);

    const restaurantList = useQuery('fetchAllRestaurants', () => RestaurantService.fetch(),
        {retry: false, enabled: false });

    useEffect(() => {
        restaurantList.refetch();
    }, []);

    const onViewMenu = (restaurantId: number) => {
        setOrderForm([true, restaurantId]);
    }

    const loading = false; //TODO: use

    return <div>
        {loading ? <LoaderComponent /> :
            <Paper elevation={0} className="feed-container">
                {!restaurantList.isLoading && restaurantList.data && <RestaurantTableComponent
                    list={restaurantList.data.data}
                    onViewMenu={onViewMenu}
                    isOwner={false}
                    onEdit={null}
                    onDelete={null}
                />}

                <Drawer anchor="right" open={orderForm[0]} onClose={()=>setOrderForm([false, null])}>
                    <OrderCreator restaurantId={orderForm[1]}/>
                </Drawer>
            </Paper>

        }
    </div>
}