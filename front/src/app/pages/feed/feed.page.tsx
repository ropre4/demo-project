import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from 'react-query';
import './feed.css';
import {ILoggedUser} from "../../user/loginUser";
import {LoaderComponent} from "../../common/loader/loader.component";
import {RestaurantService} from "../../restaurant/restaurant.service";
import {Paper, Drawer, Tabs, Tab} from "@material-ui/core";
import {RestaurantTableComponent} from "../../components/restaurantTable/restaurantTable.component";
import {useEffect} from "react";
import {OrderCreator} from "../../components/orderCreator/order.creator";
import {OrderService} from "../../order/order.service";
import {OrderTableComponent} from "../../components/orderTable/orderTable.component";

enum FeedTabs {
    RESTAURANTS = 0,
    OPEN_ORDERS = 1,
    CLOSED_ORDERS = 2
}

export interface IFeedPageProps {
    user: ILoggedUser
}

export interface IFeedPageDispatcher {
}

interface Props extends IFeedPageProps, IFeedPageDispatcher {}

export default function FeedPage(props: Props) {

    const {t} = useTranslation();
    const [orderForm, setOrderForm] = useState<[boolean, number]>([false, null]);
    const [currentTab, setCurrentTab] = useState<FeedTabs>(FeedTabs.RESTAURANTS);

    const restaurantList = useQuery('fetchAllRestaurants', () => RestaurantService.fetch(),
        {retry: false, enabled: false });
    const orderList = useQuery('fetchCustomerOrders', () => OrderService.fetchByCustomerId(props.user.id),
        {retry: false, enabled: false });

    useEffect(() => {
        restaurantList.refetch();
    }, []);

    const onViewMenu = (restaurantId: number) => {
        setOrderForm([true, restaurantId]);
    };

    const onPlaceOrder = () => {
        setOrderForm([false, null]);
        //todo: refetch orders
    };
    const onTabChange = (value: FeedTabs) => {
        setCurrentTab(value);
        switch(value){
            case FeedTabs.RESTAURANTS:
                restaurantList.refetch();
                break;
            case FeedTabs.OPEN_ORDERS:
                orderList.refetch();
                break;
        }
    };

    const loading = false; //TODO: use

    return <div>
        {loading ? <LoaderComponent /> :
            <Paper elevation={0} className="feed-container">
                <Tabs
                    value={currentTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={(_, value)=>onTabChange(value)}
                >
                    <Tab label={t('feed_tabs:restaurants')} style={{width: '50%', fontWeight: 'bold'}} value={FeedTabs.RESTAURANTS}/>
                    <Tab label={t('feed_tabs:open_orders')} style={{width: '50%', fontWeight: 'bold'}} value={FeedTabs.OPEN_ORDERS}/>
                    <Tab label={t('feed_tabs:closed_orders')} style={{width: '50%', fontWeight: 'bold'}} value={FeedTabs.CLOSED_ORDERS}/>
                </Tabs>
                {currentTab === FeedTabs.RESTAURANTS && !restaurantList.isLoading && restaurantList.data &&
                <RestaurantTableComponent
                    list={restaurantList.data.data}
                    onViewMenu={onViewMenu}
                    isOwner={false}
                    onEdit={null}
                    onDelete={null}
                />}
                {currentTab === FeedTabs.OPEN_ORDERS && !orderList.isLoading && orderList.data &&
                <OrderTableComponent
                    list={orderList.data.data}
                    isCustomer={true}
                    onBlockCustomer={null}
                    onViewLines={()=>{}}
                    onViewStatusHistory={()=>{}}
                />}
                <Drawer anchor="right" open={orderForm[0]} onClose={()=>setOrderForm([false, null])}>
                    <OrderCreator restaurantId={orderForm[1]} onSubmit={onPlaceOrder}/>
                </Drawer>
            </Paper>

        }
    </div>
}