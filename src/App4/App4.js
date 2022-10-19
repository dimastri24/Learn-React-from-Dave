import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App4Main from './App4Main';
import { StoreProvider } from 'easy-peasy';
import store from './store';

import './App4.css';

function App4() {
  return (
    <StoreProvider store={store}>
      <Router>
          <Route path="/" component={App4Main}/>
      </Router>
    </StoreProvider>
  )
}

export default App4