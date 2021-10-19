import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { faConfig } from './util/configuration';

faConfig.load();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
