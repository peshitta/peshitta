import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

import Expander from '../Expander';
import TableSearch from './TableSearch';

export default class Root extends React.PureComponent {
  static contextTypes = {
    roots: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    rootLen: PropTypes.number.isRequired,

    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    boolCellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired,
    getDbIndex: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    sortBy: 'id',
    sortDirection: SortDirection.ASC,
    sortedList: this.context.roots
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

  columns = [
    { value: 'id', label: 'Id' },
    { value: 'root', label: 'Root' },
    { value: 'sort', label: 'Sort' },
    { value: 'seyame', label: 'Seyame', flag: true },
    { value: 'rootType', label: 'Root Type' }
  ];

  render() {
    const minWidth = 412;
    const { sortBy, sortDirection, sortedList } = this.state;

    return (
      <React.Fragment>
        <TableSearch
          columns={this.columns}
          columnWidth={127}
          dataLen={this.context.rootLen}
          history={this.props.history}
          sort={this.sort}
          sortList={this.sortList}
          table="root"
        />
        <Expander>
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
                className="db-table"
                gridClassName="peshitta-grid"
                headerClassName="header-style"
                scrollToAlignment="start"
                scrollToIndex={this.context.getDbIndex(
                  sortedList,
                  this.props.match.params.id
                )}
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
                  minWidth={64}
                  width={64}
                  cellRenderer={this.context.boolCellRenderer}
                />
                <Column
                  label="Root Type"
                  dataKey="rootType"
                  minWidth={90}
                  width={90}
                />
              </Table>
            )}
          </AutoSizer>
        </Expander>
      </React.Fragment>
    );
  }
}
