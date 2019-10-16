import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware,compose, combineReducers} from 'redux';
import builderreducer from './store/reducers/bugerbuilder';
import orderreducer from './store/reducers/orders';
import authreducer from './store/reducers/Auth';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer=combineReducers(
    {
        build:builderreducer,
        order:orderreducer,
        auth:authreducer
    }
);

const store=createStore(reducer,composeEnhancers(applyMiddleware(thunk)));


const app=(<Provider store={store}>
            <BrowserRouter>
            <App/>
            </BrowserRouter>
    </Provider>)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
