import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material';

import lightTheme from './styles/theme';
import App from './app';

import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
