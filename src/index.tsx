import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
const el = document.getElementById('root') as HTMLElement
ReactDOM.render(<App />, el)

reportWebVitals();
