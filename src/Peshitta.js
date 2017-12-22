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
    flexify: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    startBook: 0,
    startChapter: 0,
    startVerse: 0,
    endBook: 0,
    endChapter: 0,
    endVerse: 0
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

  verseBuilder = (data, index) => {
    if (Array.isArray(data.content)) {
      return data.content.reduce(
        (acc, id, i) => [
          ...acc,
          <span key={`${index}-${i}`} title={words[id].word}>
            <span className="estrangela">{toEstrangela(words[id].word)} </span>
          </span>
        ],
        ''
      );
    }
    return (
      <div>
        <span title={data.content.name}>
          <span className="estrangela">{toEstrangela(data.content.name)} </span>
        </span>
        <span title={data.chapter}>
          <span className="estrangela">
            {toEstrangela(mapper.getNumber(data.chapter))}
          </span>
        </span>
      </div>
    );
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

  onResize = ({ width, height }) => {
    this.cache.clearAll();
  };

  rowClassName = ({ index }) => (index % 2 === 0 ? 'evenRow' : 'oddRow');

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

  contentColumnLabel = () => {
    const startBook = getBook(this.state.startBook).englishName;
    const startRef = `${this.state.startChapter}:${this.state.startVerse}`;
    const endRef = `${this.state.endChapter}:${this.state.endVerse}`;
    if (this.state.startBook === this.state.endBook) {
      return `${startBook} ${startRef} - ${endRef}`;
    }
    return `${startBook} ${startRef} - ${
      getBook(this.state.endBook).englishName
    } ${endRef}`;
  };

  verseCellRenderer = ({ rowData, rowIndex }) => (
    <div title={rowData.verse || '\u00A0'}>
      <div className="estrangela">
        {rowData.verse
          ? toEstrangela(mapper.getNumber(rowData.verse))
          : '\u00A0'}
      </div>
    </div>
  );

  contentCellRenderer = ({
    columnIndex,
    dataKey,
    parent,
    rowIndex,
    rowData
  }) => {
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={columnIndex}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div style={{ whiteSpace: 'normal' }}>
          {this.verseBuilder(rowData, rowIndex)}
        </div>
      </CellMeasurer>
    );
  };

  render() {
    return (
      <div className="flex-item text-right">
        <AutoSizer onResize={this.onResize}>
          {({ width, height }) => (
            <Table
              headerHeight={24}
              height={height}
              rowCount={ubs.verses + ubs.chapters}
              rowGetter={this.rowGetter}
              rowHeight={this.cache.rowHeight}
              width={width}
              rowClassName={this.rowClassName}
              gridClassName="peshitta-grid"
              overscanRowCount={2}
              onRowsRendered={this.onRowsRendered}
              deferredMeasurementCache={this.cache}
            >
              <Column
                dataKey="content"
                width={width - 40}
                label={this.contentColumnLabel()}
                cellRenderer={this.contentCellRenderer}
                className="wall-cell"
                headerStyle={{ textTransform: 'none' }}
                style={{ margin: '0' }}
              />
              <Column
                dataKey="verse"
                width={35}
                minWidth={35}
                label={'\u00A0'}
                cellRenderer={this.verseCellRenderer}
                className="cell"
                style={{ margin: '0' }}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
