import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RootStateStore} from "../../reducers";
import {BlockUserAction, IAction} from "../../user/user.actions";
import DashboardPage, {IDashboardPageDispatcher, IDashboardPageProps} from "./dashboard.page";
import {DeleteRestaurantAction} from "../../restaurant/restaurant.actions";

function mapStateToProps(state: RootStateStore): IDashboardPageProps {
    return {
        user: state.user.user
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): IDashboardPageDispatcher {
    return {
        deleteRestaurant: (id: number, done: Function) => dispatch(new DeleteRestaurantAction(id, done)),
        blockUser: (userId: number) => dispatch(new BlockUserAction(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
