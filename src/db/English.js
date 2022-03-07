import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

import Expander from '../Expander';
import TableSearch from './TableSearch';
import { sort as calSort } from 'cal-code-util';

export default class English extends React.PureComponent {
  static contextTypes = {
    english: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    englishLen: PropTypes.number.isRequired,

    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    estrangelaLinkCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired,
    boolCellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired,
    getDbIndex: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    sortBy: 'id',
    sortDirection: SortDirection.ASC,
    sortedList: this.context.english
  };

  sortList = ({ sortBy, sortDirection }) => {
    var result =
      sortBy === 'lexeme'
        ? this.context.english.sortBy(item => item[sortBy], calSort)
        : this.context.english.sortBy(item => item[sortBy]);
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
    { value: 'before', label: 'Text Before Word' },
    { value: 'after', label: 'Text After Word' },
    { value: 'comment', label: 'Comment' },
    { value: 'commentPosition', label: 'Comment Position' },
    { value: 'commentFont', label: 'Comment Font' },
    { value: 'stringBeforeFont', label: 'Before Font' },
    { value: 'stringAfterFont', label: 'After Font' },
    { value: 'verbType', label: 'Verb Type' },
    { value: 'number', label: 'Number' },
    { value: 'gender', label: 'Gender' },
    { value: 'form', label: 'Form' },
    { value: 'flag', label: 'Flag', flag: true }
  ];

  render() {
    const minWidth = 1432;
    const { sortBy, sortDirection, sortedList } = this.state;

    return (
      <React.Fragment>
        <TableSearch
          columns={this.columns}
          columnWidth={187}
          dataLen={this.context.englishLen}
          history={this.props.history}
          sort={this.sort}
          sortList={this.sortList}
          table="english"
        />
        <Expander>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                width={this.context.getViewWidth(width, minWidth)}
                height={height}
                headerHeight={21}
                rowHeight={24}
                rowCount={this.context.englishLen}
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
                  minWidth={99}
                  width={99}
                  cellDataGetter={this.context.estrangelaCellDataGetter}
                  cellRenderer={this.context.estrangelaLinkCellRenderer(
                    'lexeme',
                    'lexemeId'
                  )}
                />
                <Column
                  label="Word"
                  dataKey="word"
                  minWidth={125}
                  width={125}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Text Before Word"
                  dataKey="before"
                  minWidth={117}
                  width={117}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Text After Word"
                  dataKey="after"
                  minWidth={152}
                  width={152}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Comment"
                  dataKey="comment"
                  minWidth={210}
                  width={210}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Comment Position"
                  dataKey="commentPosition"
                  minWidth={124}
                  width={124}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Comment Font"
                  dataKey="commentFont"
                  minWidth={105}
                  width={105}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Before Font"
                  dataKey="stringBeforeFont"
                  minWidth={86}
                  width={86}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="After Font"
                  dataKey="stringAfterFont"
                  minWidth={78}
                  width={78}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Verb Type"
                  dataKey="verbType"
                  minWidth={75}
                  width={75}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Number"
                  dataKey="number"
                  minWidth={66}
                  width={66}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Gender"
                  dataKey="gender"
                  minWidth={62}
                  width={62}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Form"
                  dataKey="form"
                  minWidth={66}
                  width={66}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Flag"
                  dataKey="flag"
                  minWidth={42}
                  width={42}
                  cellRenderer={this.context.boolCellRenderer}
                />
              </Table>
            )}
          </AutoSizer>
        </Expander>
      </React.Fragment>
    );
  }
}
