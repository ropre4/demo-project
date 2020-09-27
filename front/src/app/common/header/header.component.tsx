import * as React from "react";
import {useTranslation} from "react-i18next";
import {RootStateStore} from "../../reducers";
import {Dispatch} from "redux";
import {IAction, LoginAction, LogoutAction} from "../../user/user.actions";
import {connect} from "react-redux";
import './header.css'
import {useHistory} from "react-router";
import {ILoggedUser} from "../../user/loginUser";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

function mapStateToProps(state: RootStateStore): HeaderStateProps {
    return {
        loading: state.user.loading,
        user: state.user.user
    }
}
function mapDispatchToProps(dispatch: Dispatch<IAction>): HeaderDispatcher {
    return {
        logout: ()=>dispatch(new LogoutAction())
    }
}

export interface HeaderStateProps {
    loading: boolean,
    user: ILoggedUser
}
export interface HeaderDispatcher {
    logout: ()=>void
}

interface Props extends HeaderStateProps, HeaderDispatcher {}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
function HeaderComponent(props: Props) {
    const {t} = useTranslation();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('token');
        props.logout();
        handleClose();
    }

    return <div className={"fd-header"}>
        <div className={"fd-header-logo"}>
            <span>Food</span>
            <span className={"fd-header-logo-accent"}>Delivery</span>
        </div>
        <div className={"fd-header-motto"}>{t('common:motto')}</div>
        <div className="fd-header-user-block">
            {props.user ? <div>{t('header:greeting')}, <span style={{textDecoration: 'underline', cursor: 'pointer'}}
                    onClick={handleClick}>{props.user.name}</span>!</div>
                : <div className={"fd-header-login-button"} onClick={()=>history.push("/login")}>
                {t('common:login')}
            </div>}

            <Menu
                id="simple-menu"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>

    </div>;
}