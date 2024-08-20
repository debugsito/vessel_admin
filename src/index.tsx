import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line import/extensions
import reportWebVitals from './reportWebVitals';
import dataProviderFactory from './dataProvider';

const prepareDataProvider = async () => {
  const dataProvider = await dataProviderFactory(
    process.env.REACT_APP_DATA_PROVIDER || '',
  );
  return { dataProvider };
};

prepareDataProvider().then(({ dataProvider }) => {
  ReactDOM.render(
    <App dataProvider={dataProvider} onUnmount={() => null} />,
    document.getElementById('root'),
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
