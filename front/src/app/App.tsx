import { Suspense, lazy } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React from 'react';
import './App.css';
import {MuiThemeProvider} from "@material-ui/core/styles";
import {muiTheme} from "./App.theme";
import {appHistory, store} from "./reducers";

import HeaderComponent from "./common/header/header.component";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

const LoginPage = lazy(()=>import('./pages/login/login.page'));
const RegisterPage = lazy(()=>import('./pages/register/register.page'));


function App() {
    return (
        <MuiThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Provider store={store}>
                    <ConnectedRouter history={appHistory}>
                        <div className="App">
                            <HeaderComponent/>
                            <Suspense fallback={<LinearProgress color="secondary" />}>
                                <Switch>
                                    <Route exact path={"/login"} component={LoginPage}/>
                                    <Route exact path={"/register"} component={RegisterPage}/>
                                </Switch>
                            </Suspense>
                        </div>
                    </ConnectedRouter>
                </Provider>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
