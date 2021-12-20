import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import { Provider } from 'react-redux';
import { createAPI } from './services/api';

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
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
