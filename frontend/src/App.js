import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <>
    <Router>
      <Route exact path="/" component={Home} />
      <Router exact path="/login" component={Login} />
      <Router exact path="/register" component={Register} />
    </Router>
    </>
  );
}

export default App;
