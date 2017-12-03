import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Etymology extends React.PureComponent {
  static contextTypes = {
    etymology: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    etymologyLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.etymology;
    const minWidth = 382;

    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={this.context.getViewWidth(width, minWidth)}
              height={height}
              headerHeight={22}
              rowHeight={24}
              rowCount={this.context.etymologyLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" minWidth={30} width={30} />
              <Column
                label="Lexeme"
                dataKey="lexeme"
                minWidth={80}
                width={80}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="Word"
                dataKey="word"
                minWidth={115}
                width={115}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Language"
                dataKey="language"
                minWidth={60}
                width={65}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Word Type"
                dataKey="wordType"
                minWidth={80}
                width={80}
                cellRenderer={this.context.cellRenderer}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
