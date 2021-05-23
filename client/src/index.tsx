import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from "redux";
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers/rootReducer';

import thunk from "redux-thunk";

const store = createStore(rootReducer,applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
       <App />
     </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);