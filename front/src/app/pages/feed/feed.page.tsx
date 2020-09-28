import * as React from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from 'react-query';
import './feed.css';
import {ILoggedUser} from "../../user/loginUser";
import {LoaderComponent} from "../../common/loader/loader.component";
import {RestaurantService} from "../../restaurant/restaurant.service";
import {Paper} from "@material-ui/core";
import {RestaurantTableComponent} from "../../components/restaurantTable/restaurantTable.component";
import {useEffect} from "react";


export interface IFeedPageProps {
    user: ILoggedUser
}

export interface IFeedPageDispatcher {
}

interface Props extends IFeedPageProps, IFeedPageDispatcher {}

export default function FeedPage(props: Props) {

    const {t} = useTranslation();

    const restaurantList = useQuery('fetchAllRestaurants', () => RestaurantService.fetch(),
        {retry: false, enabled: false });

    useEffect(() => {
        restaurantList.refetch();
    }, []);

    const loading = false; //TODO: use

    return <div>
        {loading ? <LoaderComponent /> :
            <Paper elevation={0} className="feed-container">
                {!restaurantList.isLoading && restaurantList.data && <RestaurantTableComponent
                    list={restaurantList.data.data}
                    onViewMenu={()=>{}}
                    isOwner={false}
                    onEdit={null}
                    onDelete={null}
                />}
            </Paper>
        }
    </div>
}