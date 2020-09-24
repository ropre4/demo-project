import * as React from "react";
import {useTranslation} from "react-i18next";
import {RootStateStore} from "../app/reducers";
import {Dispatch} from "redux";
import {IAction, LoginAction} from "../app/user/user.actions";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button/Button";

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


    return <div>
        {t('common:motto')}
        <Button color="secondary" variant="outlined"  onClick={props.login}>LOGIN</Button>

    </div>;
}