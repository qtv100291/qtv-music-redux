import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import history from './ultis/history';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import additionalFunctionDom from './ultis/additionalFunctionDom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store = {store}>
    <Router history={history}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

// set position: fixed to footer if html height < window height
const resizeObserver = new ResizeObserver( ()=> {
  additionalFunctionDom.checkhtmlHeight();
})
resizeObserver.observe(document.documentElement)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();