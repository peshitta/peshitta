import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Immutable from 'immutable';

import Navigation from './Navigation';
import About from './About';
import Settings from './Settings';
import TextMap from './map/TextMap';
import NumberMap from './map/NumberMap';
import Root from './db/Root';
import Lexeme from './db/Lexeme';
import Word from './db/Word';
import English from './db/English';
import Etymology from './db/Etymology';
import Peshitta from './Peshitta';

import { getRoot } from 'sedra-model';
import roots from 'sedrajs/build/sedra/roots';
import { getLexeme } from 'sedra-model';
import lexemes from 'sedrajs/build/sedra/lexemes';
import { getWord } from 'sedra-model';
import words from 'sedrajs/build/sedra/words';
import { getEnglish } from 'sedra-model';
import english from 'sedrajs/build/sedra/english';
import { getEtymology } from 'sedra-model';
import etymology from 'sedrajs/build/sedra/etymology';

import './App.css';

const cached = Object.freeze(
  Object.create(null, {
    roots: { value: [], enumerable: true },
    lexemes: { value: [], enumerable: true },
    words: { value: [], enumerable: true },
    english: { value: [], enumerable: true },
    etymology: { value: [], enumerable: true }
  })
);

const flatten = (modelName, getModel, parentData) => {
  return (raw, index) => {
    const cm = cached[modelName];
    let model = cm[index];
    if (model) {
      return model;
    }
    model = getModel(index, raw, parentData);
    cm[index] = model;
    return model;
  };
};
const flattenRoot = flatten('roots', getRoot);
const flattenLexeme = flatten('lexemes', getLexeme, roots);
const flattenWord = flatten('words', getWord, lexemes);
const flattenEnglish = flatten('english', getEnglish, lexemes);
const flattenEtymology = flatten('etymology', getEtymology, lexemes);

class App extends React.Component {
  static childContextTypes = {
    roots: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    rootLen: PropTypes.number.isRequired,

    lexemes: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    lexemeLen: PropTypes.number.isRequired,

    words: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    wordLen: PropTypes.number.isRequired,

    english: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    englishLen: PropTypes.number.isRequired,

    etymology: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    etymologyLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    flexified: false
  };

  flexify = state => {
    if (this.state.flexified !== state) {
      this.setState({
        flexified: state
      });
    }
  };

  getChildContext() {
    return {
      roots: Immutable.Seq.Indexed(roots)
        .map(flattenRoot)
        .slice(1),
      rootLen: roots.length - 1,

      lexemes: Immutable.Seq.Indexed(lexemes)
        .map(flattenLexeme)
        .slice(1),
      lexemeLen: lexemes.length - 1,

      words: Immutable.Seq.Indexed(words)
        .map(flattenWord)
        .slice(1),
      wordLen: words.length - 1,

      english: Immutable.Seq.Indexed(english)
        .map(flattenEnglish)
        .slice(1),
      englishLen: english.length - 1,

      etymology: Immutable.Seq.Indexed(etymology)
        .map(flattenEtymology)
        .slice(1),
      etymologyLen: etymology.length - 1,

      flexify: this.flexify
    };
  }

  render = () => (
    <div className={this.state.flexified ? 'flex-container' : ''}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Peshitta} />

        <Route path="/root" component={Root} />
        <Route path="/lexeme" component={Lexeme} />
        <Route path="/word" component={Word} />
        <Route path="/english" component={English} />
        <Route path="/etymology" component={Etymology} />

        <Route path="/text" component={TextMap} />
        <Route path="/number" component={NumberMap} />

        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />

        <Route component={Peshitta} />
      </Switch>
    </div>
  );
}

export default App;
