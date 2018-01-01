import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

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

  render() {
    const minWidth = 1290;
    const { sortBy, sortDirection, sortedList } = this.state;

    return (
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
              minWidth={110}
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
              minWidth={200}
              width={200}
              cellRenderer={this.context.cellRenderer}
            />
            <Column
              label="Comment Position"
              dataKey="commentPosition"
              minWidth={90}
              width={124}
              cellRenderer={this.context.cellRenderer}
            />
            <Column
              label="Comment Font"
              dataKey="commentFont"
              minWidth={55}
              width={105}
              cellRenderer={this.context.cellRenderer}
            />
            <Column
              label="Before Font"
              dataKey="stringBeforeFont"
              minWidth={55}
              width={86}
              cellRenderer={this.context.cellRenderer}
            />
            <Column
              label="After Font"
              dataKey="stringAfterFont"
              minWidth={55}
              width={78}
              cellRenderer={this.context.cellRenderer}
            />
            <Column
              label="Verb Type"
              dataKey="verbType"
              minWidth={65}
              width={75}
              cellRenderer={this.context.cellRenderer}
            />
            <Column
              label="Number"
              dataKey="number"
              minWidth={50}
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
              minWidth={62}
              width={62}
              cellRenderer={this.context.cellRenderer}
            />
            <Column
              label="Flag"
              dataKey="flag"
              minWidth={30}
              width={42}
              cellRenderer={this.context.cellRenderer}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}
