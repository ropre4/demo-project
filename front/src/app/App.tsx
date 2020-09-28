import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider} from "@material-ui/core/styles";
import {muiTheme} from "./App.theme";
import {appHistory, store} from "./reducers";
import HeaderComponent from "./common/header/header.component";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {LoaderComponent} from "./common/loader/loader.component";
import {UserRole} from "./user/registerUser";

const DashboardPage = lazy(()=>import("./pages/dashboard/dashboard.container"));
const FeedPage = lazy(()=>import("./pages/feed/feed.container"));
const LoginPage = lazy(()=>import('./pages/login/login.container'));
const RegisterPage = lazy(()=>import('./pages/register/register.container'));


const isCustomer = ()=>{
    const userState = store.getState().user;
    return userState.isLogged && userState.user?.role === UserRole.CUSTOMER;
}
const isOwner = ()=>{
    const userState = store.getState().user;
    return userState.isLogged && userState.user?.role === UserRole.RESTAURANT_OWNER;
}

function App() {
    return (
        <MuiThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Provider store={store}>
                    <ConnectedRouter history={appHistory}>
                        <div className="App">
                            <HeaderComponent/>
                            <Suspense fallback={<LoaderComponent />}>
                                <Switch>
                                    <Route exact path={"/login"} component={LoginPage}/>
                                    <Route exact path={"/register"} component={RegisterPage}/>

                                    <PrivateRoute exact={true} path={"/dashboard"} component={DashboardPage} canAccess={isOwner}/>

                                    <PrivateRoute exact={true} path={"/feed"} component={FeedPage} canAccess={isCustomer}/>
                                </Switch>
                            </Suspense>
                        </div>
                    </ConnectedRouter>
                </Provider>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
    canAccess: Function;
}> = (props) => {
    return  props.canAccess() ? (<Route path={props.path}  exact={props.exact} component={props.component} />) : (<Redirect  to="/"/>);
};

export default App;
