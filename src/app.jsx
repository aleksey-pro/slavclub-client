import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import './app.css';
import 'antd/dist/antd.less';

const render = async () => {
  ReactDOM.render(
    <HashRouter basepath={document.location.pathname}>
      <Routes />
    </HashRouter>,
    document.getElementById('root'),
  );
};

window.addEventListener('DOMContentLoaded', render);
