import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RootStateStore} from "../../reducers";
import RegisterPage, {IRegisterPageDispatcher, IRegisterPageProps} from "./register.page";
import {IAction, RegisterAction} from "../../user/user.actions";
import {IRegisterUser} from "../../user/registerUser";

function mapStateToProps(state: RootStateStore): IRegisterPageProps {
    return {
        loading: state.user.loading
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>): IRegisterPageDispatcher {
    return {
        register: (user: IRegisterUser, done: Function) => dispatch(new RegisterAction(user, done))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
