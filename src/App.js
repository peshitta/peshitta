import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Settings from './Settings';
import Navigation from './Navigation';
import Peshitta from './Peshitta';
import TextMap from './convert/MapText';
import NumberMap from './convert/MapNumber';
import Root from './lexicon/Root';
import Lexeme from './lexicon/Lexeme';
import Word from './lexicon/Word';
import English from './lexicon/English';
import Etymology from './lexicon/Etymology';
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
