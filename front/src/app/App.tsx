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

const LoginPage = lazy(()=>import('./pages/login.page'));


function App() {
    return (
        <MuiThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Provider store={store}>
                    <ConnectedRouter history={appHistory}>
                        <div className="App">
                            <HeaderComponent/>
                            <Suspense fallback={"loading..."}>
                                <Switch>
                                    <Route exact path={"/login"} component={LoginPage}/>
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
