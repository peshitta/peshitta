import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Immutable from 'immutable';

import Navigation from './nav/Navigation';
import Settings from './Settings';
import Help from './Help';
import TextMap from './map/TextMap';
import NumberMap from './map/NumberMap';
import Root from './db/Root';
import Lexeme from './db/Lexeme';
import Word from './db/Word';
import English from './db/English';
import Etymology from './db/Etymology';
import Peshitta from './nt/Peshitta';

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
import { toEstrangela } from 'cal-estrangela';

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
    if (raw) {
      model = getModel(index, raw, parentData);
      cm[index] = model;
      return model;
    }
    return null;
  };
};
const flattenRoot = flatten('roots', getRoot);
const flattenLexeme = flatten('lexemes', getLexeme, roots);
const flattenWord = flatten('words', getWord, lexemes);
const flattenEnglish = flatten('english', getEnglish, lexemes);
const flattenEtymology = flatten('etymology', getEtymology, lexemes);
const estrangelaCellDataGetter = obj => toEstrangela(obj.rowData[obj.dataKey]);
const estrangelaCellRenderer = obj => (
  <div className="estrangela-cell" title={obj.rowData[obj.dataKey] || '\u00A0'}>
    <div className="estrangela">{obj.cellData || '\u00A0'}</div>
  </div>
);
const estrangelaLinkCellRenderer = (db, col) => obj => (
  <div className="estrangela-cell" title={obj.rowData[obj.dataKey] || '\u00A0'}>
    <div className="estrangela">
      <Link to={`/${db}/${obj.rowData[col]}`}>{obj.cellData || '\u00A0'}</Link>
    </div>
  </div>
);
const cellRenderer = obj => obj.cellData || (obj.cellData === 0 ? 0 : '\u00A0');
const boolCellRenderer = obj =>
  obj.cellData === true ? 'Yes' : obj.cellData === false ? 'No' : '\u00A0';
const nullFilter = m => m !== null;
const rowClassName = ({ index }) => (index % 2 === 0 ? 'evenRow' : 'oddRow');
const getDbIndex = (db, id) => {
  let n = parseInt(id, 10);
  if (isNaN(n) || n < 1) {
    return 0;
  }
  return db.findKey(v => v.id === n) || 0;
};

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

    getViewWidth: PropTypes.instanceOf(Function).isRequired,

    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    estrangelaLinkCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired,
    boolCellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired,
    getDbIndex: PropTypes.instanceOf(Function).isRequired
  };

  getViewWidth(width, minWidth) {
    return width < minWidth ? minWidth : width;
  }

  getChildContext() {
    return {
      roots: Immutable.Seq.Indexed(roots)
        .map(flattenRoot)
        .filter(nullFilter),
      rootLen: 2050,

      lexemes: Immutable.Seq.Indexed(lexemes)
        .map(flattenLexeme)
        .filter(nullFilter),
      lexemeLen: 3559,

      words: Immutable.Seq.Indexed(words)
        .map(flattenWord)
        .filter(nullFilter),
      wordLen: 29699,

      english: Immutable.Seq.Indexed(english)
        .map(flattenEnglish)
        .filter(nullFilter),
      englishLen: 6352,

      etymology: Immutable.Seq.Indexed(etymology)
        .map(flattenEtymology)
        .filter(nullFilter),
      etymologyLen: 171,

      getViewWidth: this.getViewWidth,
      estrangelaCellDataGetter,
      estrangelaCellRenderer,
      estrangelaLinkCellRenderer,
      cellRenderer,
      rowClassName,
      boolCellRenderer,
      getDbIndex
    };
  }

  render = () => (
    <div className={'flex-container'}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Peshitta} />

        <Route path="/root/:id?" component={Root} />
        <Route path="/lexeme/:id?" component={Lexeme} />
        <Route path="/word/:id?" component={Word} />
        <Route path="/english/:id?" component={English} />
        <Route path="/etymology/:id?" component={Etymology} />

        <Route path="/text" component={TextMap} />
        <Route path="/number" component={NumberMap} />

        <Route path="/settings" component={Settings} />
        <Route path="/help" component={Help} />

        <Route path="/:book/:chapter?/:verse?" component={Peshitta} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
