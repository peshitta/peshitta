import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Peshitta from './Peshitta';
import TextMapper from './convert/TextMapper';
import NumberMapper from './convert/NumberMapper';
import About from './About';
import './font.css';
import './App.css';

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Peshitta} />
      <Route path="/convert/text" component={TextMapper} />
      <Route path="/convert/number" component={NumberMapper} />
      <Route path="/about" component={About} />
    </Switch>
  </div>
);

export default App;
