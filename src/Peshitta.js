import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column, AutoSizer } from 'react-virtualized';

import { getBook } from 'sedra-model';
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

  indexMap = [];

  onRowsRendered = obj => {
    const { startIndex, stopIndex } = obj;
    const start = this.indexMap[startIndex];
    const end = this.indexMap[stopIndex];

    this.setState({
      startBook: start.book,
      startChapter: start.chapter,
      startVerse: start.verse || 1,
      endBook: end.book,
      endChapter: end.chapter,
      endVerse: end.verse || 1
    });
  };

  verseReducer = (a, i) => [
    ...a,
    ' ',
    <span title={words[i].word}>
      <span className="estrangela">{toEstrangela(words[i].word)}</span>
    </span>
  ];

  verseBuilder = ({ cellData }) => {
    if (Array.isArray(cellData)) {
      return cellData.reduce(this.verseReducer, '');
    }
    return [
      <span title={cellData.book.name}>
        <span className="estrangela">{toEstrangela(cellData.book.name)}</span>
      </span>,
      ' ',
      <span title={cellData.chapter}>
        <span className="estrangela">
          {toEstrangela(mapper.getNumber(cellData.chapter))}
        </span>
      </span>
    ];
  };

  componentWillMount = () => {
    this.context.flexify(true);
    this.populateIndexMap();
  };

  getReference = (book, chapter, verse) =>
    Object.freeze(
      Object.create(null, {
        book: { value: book, enumerable: true },
        chapter: { value: chapter, enumerable: true },
        verse: { value: verse, enumerable: true }
      })
    );

  populateIndexMap = () => {
    const firstBook = 52;
    const lastBook = firstBook + (ubs.books - 1);
    for (let book = firstBook; book <= lastBook; book++) {
      const b = ubs[book];
      for (let chapter = 1; chapter <= b.chapters; chapter++) {
        this.indexMap.push(this.getReference(book, chapter, 0));
        const c = b[chapter];
        for (let verse = 1; verse <= c.verses; verse++) {
          this.indexMap.push(this.getReference(book, chapter, verse));
        }
      }
    }
  };

  rowGetter = ({ index }) => {
    const r = this.indexMap[index];
    if (r.verse) {
      return Object.create(null, {
        verse: { value: r.verse, enumerable: true },
        content: { value: ubs[r.book][r.chapter][r.verse], enumerable: true }
      });
    }
    return Object.create(null, {
      content: {
        value: Object.create(null, {
          book: { value: getBook(r.book), enumerable: true },
          chapter: { value: r.chapter, enumerable: true }
        }),
        enumerable: true
      }
    });
  };

  render() {
    return (
      <div className="flex-item text-right">
        <span>
          Peshitta UBS: {ubs.books} books, {ubs.chapters} chapters,{' '}
          {ubs.verses.toLocaleString()} verses and {ubs.words.toLocaleString()}{' '}
          words{' '}
        </span>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={this.context.getViewWidth(width, 1047)}
              height={height - 27}
              headerHeight={21}
              rowHeight={24}
              rowCount={ubs.verses + ubs.chapters}
              rowGetter={obj => this.rowGetter(obj)}
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
                cellRenderer={({ rowData, dataKey, cellData }) => (
                  <div
                    className="estrangela-cell"
                    title={rowData[dataKey] || '\u00A0'}
                  >
                    <div className="estrangela">
                      {cellData === undefined
                        ? '\u00A0'
                        : toEstrangela(mapper.getNumber(cellData))}
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
