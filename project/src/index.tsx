import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import { Provider } from 'react-redux';
import { createAPI } from './services/api';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
