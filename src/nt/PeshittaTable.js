import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Column,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

import { getBook } from 'sedra-model';
import { toEstrangela } from 'cal-estrangela';
import AramaicNumber from 'aramaic-number';
import words from 'sedrajs/build/sedra/words';
import ubs from 'sedrajs/build/sedra/ubs';

const mapper = new AramaicNumber('cal');

export default class PeshittaTable extends React.PureComponent {
  static contextTypes = {
    rowClassName: PropTypes.instanceOf(Function).isRequired
  };
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    indexReference: PropTypes.array.isRequired
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width) {
      this.cache.clearAll();
    }
  }

  rowGetter = ({ index }) => {
    const r = this.props.indexReference[index];
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

  onRowsRendered = ({ startIndex, stopIndex }) => {
    const start = this.props.indexReference[startIndex];
    const end = this.props.indexReference[stopIndex];

    this.setState({
      startBook: start.book,
      startChapter: start.chapter,
      startVerse: start.verse || 1,
      endBook: end.book,
      endChapter: end.chapter,
      endVerse: end.verse || 1
    });
  };

  contentLabel = () => {
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

  contentRenderer = ({ columnIndex, dataKey, parent, rowIndex, rowData }) => {
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

  verseRenderer = ({ rowData, rowIndex }) => (
    <div title={rowData.verse || '\u00A0'}>
      <div className="estrangela">
        {rowData.verse
          ? toEstrangela(mapper.getNumber(rowData.verse))
          : '\u00A0'}
      </div>
    </div>
  );

  render() {
    const { width, height } = this.props;
    return (
      <Table
        headerHeight={24}
        height={height}
        rowCount={ubs.verses + ubs.chapters}
        rowGetter={this.rowGetter}
        rowHeight={this.cache.rowHeight}
        width={width}
        rowClassName={this.context.rowClassName}
        gridClassName="peshitta-grid"
        headerClassName="header-style"
        overscanRowCount={2}
        onRowsRendered={this.onRowsRendered}
        deferredMeasurementCache={this.cache}
      >
        <Column
          dataKey="content"
          width={width - 40}
          label={this.contentLabel()}
          cellRenderer={this.contentRenderer}
          className="cell"
        />
        <Column
          dataKey="verse"
          width={35}
          minWidth={35}
          label="UBS"
          cellRenderer={this.verseRenderer}
          className="cell"
        />
      </Table>
    );
  }
}
