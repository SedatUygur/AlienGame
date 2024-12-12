import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
//import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import './index.css';
import Game from './containers/Game';
import reducer from './reducers';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer, })
/*const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);*/

root.render(
  <Provider store={store}>
    <Game />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
