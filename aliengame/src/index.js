import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
//import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import Game from './containers/Game';
import reducer from './reducers';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ 
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
})
/*const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);*/

root.render(
  <Auth0Provider
    domain="dev-6aiprmtpfbbrrq7n.eu.auth0.com"
    clientId="Et5ewQTuALzBdTgu0brEu15dhi0y0HV0"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <Game />
    </Provider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
