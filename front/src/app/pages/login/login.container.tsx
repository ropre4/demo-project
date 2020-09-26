import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RootStateStore} from "../../reducers";
import {IAction, LoginAction} from "../../user/user.actions";
import LoginPage, {ILoginPageDispatcher, ILoginPageProps} from "./login.page";
import {ILoginUser} from "../../user/loginUser";

function mapStateToProps(state: RootStateStore): ILoginPageProps {
    return {
        loading: state.user.loading
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): ILoginPageDispatcher {
    return {
        login: (user: ILoginUser, done: Function) => dispatch(new LoginAction(user, done))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
