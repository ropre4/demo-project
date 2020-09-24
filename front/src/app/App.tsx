import { Suspense, lazy } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React from 'react';
import './App.css';
import {MuiThemeProvider} from "@material-ui/core/styles";
import {muiTheme} from "./App.theme";
import {appHistory, store} from "./reducers";

import HeaderComponent from "../common/header.component";
import Button from "@material-ui/core/Button/Button";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

const AComponent = lazy(()=>import('../common/A.component'));
const BComponent = lazy(()=>import('../common/B.component'));


function App() {
    return (
        <MuiThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Provider store={store}>
                    <ConnectedRouter history={appHistory}>
                        <div className="App">
                            <HeaderComponent/>
                            <Button color="primary" variant="contained"  onClick={()=>null}>primary</Button>
                            <Button color="secondary" variant="contained"  onClick={()=>null}>secondary</Button>
                            <Suspense fallback={"loading..."}>
                                <Switch>
                                    <Route exact path={"/"} component={AComponent}/>
                                    <Route exact path={"/a"} component={AComponent}/>
                                    <Route exact path={"/b"} component={BComponent}/>
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
