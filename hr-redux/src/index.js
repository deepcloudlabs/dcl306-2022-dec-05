import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import HrAppReducer from "./reducers/hr-app-reducer";
import HrAppConnector from "./connectors/hr-app-connector";

const root = ReactDOM.createRoot(document.getElementById('root'));
const reducers = combineReducers({hrStore: HrAppReducer});
const store = createStore(reducers);
root.render(
    <Provider store={store}>
      <React.StrictMode>
        <HrAppConnector />
      </React.StrictMode>
    </Provider>
);