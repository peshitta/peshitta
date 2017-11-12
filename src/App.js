import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Settings from './Settings';
import Navigation from './Navigation';
import Peshitta from './Peshitta';
import TextMapper from './convert/TextMapper';
import NumberMapper from './convert/NumberMapper';
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

      <Route path="/lexicon/root" component={Root} />
      <Route path="/lexicon/lexeme" component={Lexeme} />
      <Route path="/lexicon/word" component={Word} />
      <Route path="/lexicon/english" component={English} />
      <Route path="/lexicon/etymology" component={Etymology} />
      
      <Route path="/convert/text" component={TextMapper} />
      <Route path="/convert/number" component={NumberMapper} />

      <Route path="/settings" component={Settings} />
      <Route path="/about" component={About} />
    </Switch>
  </div>
);

export default App;
