import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { HashRouter } from "react-router-dom";
import User  from './User';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <User />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


