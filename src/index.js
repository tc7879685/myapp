import  'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import RouterMap from './router/routerMap';
import FastClick from 'fastclick'
import  configStore from './redux/Store/configStore'
import  {Provider} from 'react-redux'
import  './assets/css/common.css'
import * as serviceWorker from './serviceWorker';
import './config/rem'
FastClick.attach(document.body) //放置点击事件延迟300ms事件

const store=configStore();
ReactDOM.render(
   <Provider  store ={store} >
        <RouterMap/>
   </Provider>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
