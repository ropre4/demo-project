import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import rootSaga from "./sagas";
import {createLogger} from "redux-logger";
import createSagaMiddleware from '@redux-saga/core';
import {connectRouter, routerMiddleware, RouterState} from 'connected-react-router';
import * as H from "history";
import {History} from "history";
import {UserReducer, UserState} from "../user/user.reducer";

const logger = createLogger({
    collapsed: () => true
});

const sagaMiddleware = createSagaMiddleware();

export interface RootStateStore {
    router: RouterState,
    user: UserState
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25}) || compose;

const rootReducers = (history: History) => combineReducers({
    router: connectRouter(history),
    user: UserReducer
});

export const appHistory = H.createBrowserHistory();


 const actionMiddleware = ({dispatch, getState}) => next => (action) => { //TODO: intervept Pending/Success/Failure actions to display Toastr notifications
    return next({...action});
};


export const store = createStore(
    rootReducers(appHistory),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(appHistory),
            logger,
            actionMiddleware,
            sagaMiddleware,
        )
    )
);

sagaMiddleware.run(rootSaga);