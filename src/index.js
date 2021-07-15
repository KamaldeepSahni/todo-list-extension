import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AuthProvider } from './AuthProvider';
import reducer, { initialState } from './Reducer';
import App from './App';

ReactDOM.render(
  <AuthProvider
    initialState={
      localStorage.getItem('authUser') && localStorage.getItem('authToken')
        ? {
            user: localStorage.getItem('authUser'),
            token: localStorage.getItem('authToken'),
          }
        : initialState
    }
    reducer={reducer}
  >
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
