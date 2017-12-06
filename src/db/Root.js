import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

export default class Root extends React.PureComponent {
  static contextTypes = {
    roots: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    rootLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    boolCellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    sortBy: 'id',
    sortDirection: SortDirection.ASC,
    sortedList: this.context.roots
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  sortList = ({ sortBy, sortDirection }) => {
    var result =
      sortBy === 'root'
        ? this.context.roots.sortBy(item => item.sort)
        : this.context.roots.sortBy(item => item[sortBy]);
    return sortDirection === SortDirection.DESC ? result.reverse() : result;
  };

  sort = ({ sortBy, sortDirection }) => {
    const sortedList = this.sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  render() {
    const minWidth = 392;
    const { sortBy, sortDirection, sortedList } = this.state;

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
              rowGetter={({ index }) => sortedList.get(index)}
              rowClassName={this.context.rowClassName}
              sort={this.sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            >
              <Column label="Id" dataKey="id" minWidth={33} width={33} />
              <Column
                label="Root"
                dataKey="root"
                minWidth={100}
                width={100}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="Sort"
                dataKey="sort"
                className="verba"
                minWidth={122}
                width={122}
              />
              <Column
                label="Seyame"
                dataKey="seyame"
                minWidth={34}
                width={64}
                cellRenderer={this.context.boolCellRenderer}
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
