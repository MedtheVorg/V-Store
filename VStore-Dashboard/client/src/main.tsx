import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <Router>
        <App />
        <Toaster />
      </Router>
    </ReduxStoreProvider>
  </React.StrictMode>
);
