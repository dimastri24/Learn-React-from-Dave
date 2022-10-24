import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App4Main from './App4Main';
import { StoreProvider } from 'easy-peasy';
import store from './store';

import './App4.css';

function App4() {
  return (
    <StoreProvider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App4Main/>}/>
        </Routes>
      </Router>
    </StoreProvider>
  )
}

export default App4