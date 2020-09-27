import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RootStateStore} from "../../reducers";
import {IAction} from "../../user/user.actions";
import DashboardPage, {IDashboardPageDispatcher, IDashboardPageProps} from "./dashboard.page";

function mapStateToProps(state: RootStateStore): IDashboardPageProps {
    return {
        user: state.user.user
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): IDashboardPageDispatcher {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
