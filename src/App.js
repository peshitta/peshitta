import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Settings from './Settings';
import Navigation from './Navigation';
import Peshitta from './Peshitta';
import TextMap from './map/TextMap';
import NumberMap from './map/NumberMap';
import Root from './db/Root';
import Lexeme from './db/Lexeme';
import Word from './db/Word';
import English from './db/English';
import Etymology from './db/Etymology';
import './font.css';
import './App.css';

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Peshitta} />

      <Route path="/db/root" component={Root} />
      <Route path="/db/lexeme" component={Lexeme} />
      <Route path="/db/word" component={Word} />
      <Route path="/db/english" component={English} />
      <Route path="/db/etymology" component={Etymology} />

      <Route path="/map/text" component={TextMap} />
      <Route path="/map/number" component={NumberMap} />

      <Route path="/settings" component={Settings} />
      <Route path="/about" component={About} />
    </Switch>
  </div>
);

export default App;
