import * as React from "react";
import {useTranslation} from "react-i18next";
import {RootStateStore} from "../../reducers";
import {Dispatch} from "redux";
import {IAction, LoginAction} from "../../user/user.actions";
import {connect} from "react-redux";
import './header.css'
import {useHistory} from "react-router";

function mapStateToProps(state: RootStateStore): HeaderStateProps {
    return {
        loading: state.user.loading
    }
}
function mapDispatchToProps(dispatch: Dispatch<IAction>): HeaderDispatcher {
    return {
        login: () => dispatch(new LoginAction())
    }
}


export interface HeaderStateProps {
    loading: boolean
}
export interface HeaderDispatcher {
    login: ()=>void
}
export interface IHeaderProps extends HeaderStateProps, HeaderDispatcher {

}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
function HeaderComponent(props: IHeaderProps) {
    const {t} = useTranslation();
    const history = useHistory();

    return <div className={"fd-header"}>
        <div className={"fd-header-logo"}>
            <span>Food</span>
            <span className={"fd-header-logo-accent"}>Delivery</span>
        </div>
        <div className={"fd-header-motto"}>{t('common:motto')}</div>
        <div className="fd-header-user-block">
            <div className={"fd-header-login-button"} onClick={()=>history.push("/login")}>
                {t('common:login')}
            </div>
        </div>
    </div>;
}