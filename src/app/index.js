import React from 'react';
import {hydrate, render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App'

const rendering = process.env.NODE_ENV !== 'production' ? render : hydrate 
rendering((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
), document.getElementById('root'));