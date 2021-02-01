import './App.css';

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Home from './pages/Home'
import New from './pages/New'
import Classify from './pages/Classify'
import Upload from './pages/Upload'
import My404 from './pages/My404'

function App() {

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/Classify">
            <Classify />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path='/404' exact children={<My404 />} />
          <Redirect to="/404" />
        </Switch>
    </Router>
  );
}

export default App;
