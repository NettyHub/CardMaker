import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App apiUrl={process.env.REACT_APP_API_URL} />
  </React.StrictMode>,
  document.getElementById('root')
);