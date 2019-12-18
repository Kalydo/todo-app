import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// imports the app.js from path
import App from './App';
import * as serviceWorker from './serviceWorker';

// replace the root found by id with the imported app
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
