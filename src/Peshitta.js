import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column, AutoSizer } from 'react-virtualized';

import { getBook, getVerseByIndex } from 'sedra-model';
import { toEstrangela } from 'cal-estrangela';
import AramaicNumber from 'aramaic-number';
import words from 'sedrajs/build/sedra/words';
import ubs from 'sedrajs/build/sedra/ubs';

const mapper = new AramaicNumber('cal');

export default class Peshitta extends React.PureComponent {
  static contextTypes = {
    ubs: PropTypes.instanceOf(Object).isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    startBook: 0,
    startChapter: 0,
    startVerse: 0,
    endBook: 0,
    endChapter: 0,
    endVerse: 0
  };

  onRowsRendered = obj => {
    const { startIndex, stopIndex } = obj;
    const start = getVerseByIndex(startIndex + 1, ubs);
    const end = getVerseByIndex(stopIndex + 1, ubs);

    this.setState({
      startBook: start.book,
      startChapter: start.chapter,
      startVerse: start.verse,
      endBook: end.book,
      endChapter: end.chapter,
      endVerse: end.verse
    });
  };

  verseReducer = (a, i) => {
    return `${a} ${toEstrangela(words[i].word)}`;
  };

  verseBuilder = obj => {
    return (
      <div className="estrangela">
        {obj.cellData.reduce(this.verseReducer, '')}
      </div>
    );
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    return (
      <div className="flex-item text-right">
        <span>
          Peshitta UBS: {ubs.books} books,{' '}
          {ubs.chapters} chapters,{' '}
          {ubs.verses.toLocaleString()} verses and{' '}
          {ubs.words.toLocaleString()} words{' '}
        </span>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={this.context.getViewWidth(width, 1047)}
              height={height - 27}
              headerHeight={21}
              rowHeight={24}
              rowCount={ubs.verses}
              rowGetter={({ index }) =>
                getVerseByIndex(index + 1, ubs)
              }
              rowClassName={this.context.rowClassName}
              onRowsRendered={this.onRowsRendered}
            >
              <Column
                label={`${getBook(this.state.startBook).englishName} ${
                  this.state.startChapter
                }:${this.state.startVerse} - ${
                  getBook(this.state.endBook).englishName
                } ${this.state.endChapter}:${this.state.endVerse}`}
                dataKey="content"
                minWidth={1000}
                className="estrangela-cell"
                width={this.context.getViewWidth(width, 1000) - 47}
                cellRenderer={this.verseBuilder}
              />
              <Column
                label="#"
                dataKey="verse"
                minWidth={30}
                width={30}
                cellRenderer={obj => (
                  <div
                    className="estrangela-cell"
                    title={obj.rowData[obj.dataKey] || '\u00A0'}
                  >
                    <div className="estrangela">
                      {toEstrangela(mapper.getNumber(obj.cellData)) || '\u00A0'}
                    </div>
                  </div>
                )}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
