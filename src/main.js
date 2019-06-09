import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './router';
import 'babel-polyfill'
import 'antd/dist/antd.css';

import {Provider} from 'react-redux';
import store from '@/store';

import * as serviceWorker from './serviceWorker';
//路由拦截回调函数
const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
  }
ReactDOM.render(<Provider store={store}><BrowserRouter  getUserConfirmation={getConfirmation} basename="rss/views"  >
    <MainRoute/>
</BrowserRouter></Provider>, document.getElementById('root'));

serviceWorker.unregister();
