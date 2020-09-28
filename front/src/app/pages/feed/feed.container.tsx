import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RootStateStore} from "../../reducers";
import {IAction} from "../../user/user.actions";
import FeedPage, {IFeedPageDispatcher, IFeedPageProps} from "./feed.page";

function mapStateToProps(state: RootStateStore): IFeedPageProps {
    return {
        user: state.user.user
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): IFeedPageDispatcher {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
