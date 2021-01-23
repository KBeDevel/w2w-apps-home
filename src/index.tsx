import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

console.info('%cEnsure what you will do, any action executed here could expose your data and/or break the application', 'background: orange; color: black; font-size: x-large');
console.info('%cIf you want to make a report or feedback, please go to https://gitlab.com/eclprojects/w2w-apps-home', 'background: black; color: white; font-size: large;');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
      <Routes/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
