import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import About from './About';
import './font.css';
import './App.css';

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path='/' component={About}/>
      <Route path='/about' component={About}/>
    </Switch>
  </div>
);

export default App;
