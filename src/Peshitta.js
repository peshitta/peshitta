import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Column,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

import { getBook } from 'sedra-model';
import { toEstrangela } from 'cal-estrangela';
import AramaicNumber from 'aramaic-number';
import words from 'sedrajs/build/sedra/words';
import ubs from 'sedrajs/build/sedra/ubs';

const mapper = new AramaicNumber('cal');

export default class Peshitta extends React.PureComponent {
  static contextTypes = {
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
    endVerse: 0,
    lastWidth: 0
  };

  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 24
  });

  indexMap = [];

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

  verseBuilder = data => {
    if (Array.isArray(data.content)) {
      return data.content.reduce(
        (acc, value, index) => [
          ...acc,
          <span
            key={`${data.book}-${data.chapter}-${data.verse}-${index}`}
            title={words[value].word}
          >
            <span className="estrangela">
              {toEstrangela(words[value].word)}{' '}
            </span>
          </span>
        ],
        ''
      );
    }
    return [
      <span key={`${data.book}-${data.chapter}`} title={data.content.name}>
        <span className="estrangela">{toEstrangela(data.content.name)} </span>
      </span>,
      <span
        key={`${data.book}-${data.chapter}-${data.verse}`}
        title={data.chapter}
      >
        <span className="estrangela">
          {toEstrangela(mapper.getNumber(data.chapter))}
        </span>
      </span>
    ];
  };

  componentWillMount = () => {
    this.context.flexify(true);
    this.populateIndexMap();
  };

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

  onResize = ({ height, width }) => {
    if (width !== this.state.lastWidth) {
      this.cache.clearAll();
      this.setState({ lastWidth: width });
    }
  };

  rowGetter = ({ index }) => {
    const r = this.indexMap[index];
    if (r.verse) {
      return Object.freeze(
        Object.create(null, {
          book: { value: r.book, enumerable: true },
          chapter: { value: r.chapter, enumerable: true },
          verse: { value: r.verse, enumerable: true },
          content: { value: ubs[r.book][r.chapter][r.verse], enumerable: true }
        })
      );
    }
    return Object.freeze(
      Object.create(null, {
        book: { value: r.book, enumerable: true },
        chapter: { value: r.chapter, enumerable: true },
        verse: { value: 0, enumerable: true },
        content: { value: getBook(r.book), enumerable: true }
      })
    );
  };

  columnCellRenderer = ({
    cellData,
    columnIndex,
    dataKey,
    rowData,
    rowIndex,
    parent
  }) => (
    <CellMeasurer
      cache={this.cache}
      columnIndex={columnIndex}
      key={dataKey}
      parent={parent}
      rowIndex={rowIndex}
    >
      <div style={{ whiteSpace: 'normal' }}>{this.verseBuilder(rowData)}</div>
    </CellMeasurer>
  );

  render() {
    return (
      <div className="flex-item text-right">
        <span>
          Peshitta UBS: {ubs.books} books, {ubs.chapters} chapters,{' '}
          {ubs.verses.toLocaleString()} verses and {ubs.words.toLocaleString()}{' '}
          words{' '}
        </span>
        <AutoSizer onResize={this.onResize}>
          {({ width, height }) => (
            <Table
              deferredMeasurementCache={this.cache}
              headerHeight={21}
              height={height - 27}
              overscanRowCount={2}
              rowClassName={this.context.rowClassName}
              rowHeight={this.cache.rowHeight}
              rowGetter={obj => this.rowGetter(obj)}
              rowCount={ubs.verses + ubs.chapters}
              width={width}
              onRowsRendered={this.onRowsRendered}
            >
              <Column
                label={`${getBook(this.state.startBook).englishName} ${
                  this.state.startChapter
                }:${this.state.startVerse} - ${
                  getBook(this.state.endBook).englishName
                } ${this.state.endChapter}:${this.state.endVerse}`}
                dataKey="content"
                className="estrangela-cell"
                width={width - 47}
                cellRenderer={this.columnCellRenderer}
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
