import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

import Expander from '../Expander';
import TableSearch from './TableSearch';
import { sort as calSort } from 'cal-code-util';

export default class Etymology extends React.PureComponent {
  static contextTypes = {
    etymology: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    etymologyLen: PropTypes.number.isRequired,

    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    estrangelaLinkCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired,
    getDbIndex: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    sortBy: 'id',
    sortDirection: SortDirection.ASC,
    sortedList: this.context.etymology
  };

  sortList = ({ sortBy, sortDirection }) => {
    var result =
      sortBy === 'lexeme'
        ? this.context.etymology.sortBy(item => item[sortBy], calSort)
        : this.context.etymology.sortBy(item => item[sortBy]);
    return sortDirection === SortDirection.DESC ? result.reverse() : result;
  };

  sort = ({ sortBy, sortDirection }) => {
    const sortedList = this.sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  columns = [
    { value: 'id', label: 'Id' },
    { value: 'lexeme', label: 'Lexeme' },
    { value: 'word', label: 'Word' },
    { value: 'language', label: 'Language' },
    { value: 'wordType', label: 'Word Type' }
  ];

  render() {
    const minWidth = 395;
    const { sortBy, sortDirection, sortedList } = this.state;

    return (
      <React.Fragment>
        <TableSearch
          columns={this.columns}
          columnWidth={133}
          dataLen={this.context.etymologyLen}
          history={this.props.history}
          sort={this.sort}
          sortList={this.sortList}
          table="etymology"
        />
        <Expander>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                width={this.context.getViewWidth(width, minWidth)}
                height={height}
                headerHeight={21}
                rowHeight={24}
                rowCount={this.context.etymologyLen}
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
                  label="Lexeme"
                  dataKey="lexeme"
                  minWidth={80}
                  width={80}
                  cellDataGetter={this.context.estrangelaCellDataGetter}
                  cellRenderer={this.context.estrangelaLinkCellRenderer(
                    'lexeme',
                    'lexemeId'
                  )}
                />
                <Column
                  label="Word"
                  dataKey="word"
                  minWidth={118}
                  width={118}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Language"
                  dataKey="language"
                  minWidth={76}
                  width={76}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Word Type"
                  dataKey="wordType"
                  minWidth={85}
                  width={85}
                  cellRenderer={this.context.cellRenderer}
                />
              </Table>
            )}
          </AutoSizer>
        </Expander>
      </React.Fragment>
    );
  }
}
