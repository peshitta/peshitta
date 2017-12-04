import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Root extends React.PureComponent {
  static contextTypes = {
    roots: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    rootLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.roots;
    const minWidth = 385;

    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={this.context.getViewWidth(width, minWidth)}
              height={height}
              headerHeight={21}
              rowHeight={24}
              rowCount={this.context.rootLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" minWidth={33} width={33} />
              <Column
                label="Root"
                dataKey="root"
                minWidth={99}
                width={99}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="Sort"
                dataKey="sort"
                className="verba"
                minWidth={115}
                width={115}
              />
              <Column
                label="Seyame"
                dataKey="seyame"
                minWidth={34}
                width={60}
              />
              <Column
                label="Root Type"
                dataKey="rootType"
                minWidth={87}
                width={87}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
