import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Column,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

import { toEstrangela } from 'cal-estrangela';
import { getBook } from 'sedra-model';
import AramaicNumber from 'aramaic-number';
import words from 'sedrajs/build/sedra/words';
import ubs from 'sedrajs/build/sedra/ubs';
import ubsReference from 'sedrajs/build/sedra/ubsReference';

const mapper = new AramaicNumber('cal');

export default class PeshittaTable extends React.PureComponent {
  static contextTypes = {
    rowClassName: PropTypes.instanceOf(Function).isRequired
  };
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scrollToRow: PropTypes.number,
    setLabel: PropTypes.instanceOf(Function).isRequired
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

  componentDidUpdate() {
    const scrollToRow = this.props.scrollToRow;
    if (scrollToRow !== undefined) {
      this.table.scrollToRow(scrollToRow);
    }
  }

  onRowsRendered = ({ startIndex, stopIndex }) => {
    const start = this.getReference(startIndex);
    const end = this.getReference(stopIndex);
    this.props.setLabel(start, end);
  };

  getReference = index => {
    const ref = ubsReference[index];
    return Object.freeze(
      Object.create(null, {
        book: { value: ref[0], enumerable: true },
        chapter: { value: ref[1], enumerable: true },
        verse: { value: ref[2], enumerable: true }
      })
    );
  };

  rowGetter = ({ index }) => {
    const r = this.getReference(index);
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

  setTableRef = table => (this.table = table);

  render() {
    const { width, height } = this.props;
    return (
      <Table
        disableHeader
        height={height}
        rowCount={ubs.verses + ubs.chapters}
        rowGetter={this.rowGetter}
        rowHeight={this.cache.rowHeight}
        width={width}
        className="text-right"
        rowClassName={this.context.rowClassName}
        gridClassName="peshitta-grid"
        overscanRowCount={2}
        onRowsRendered={this.onRowsRendered}
        deferredMeasurementCache={this.cache}
        scrollToAlignment="start"
        ref={this.setTableRef}
      >
        <Column
          dataKey="content"
          width={width - 35}
          label={'\u00A0'}
          cellRenderer={this.contentRenderer}
          className="cell"
        />
        <Column
          dataKey="verse"
          width={30}
          minWidth={30}
          label={'\u00A0'}
          cellRenderer={this.verseRenderer}
          className="cell"
          style={{ borderRight: 0 }}
        />
      </Table>
    );
  }
}
