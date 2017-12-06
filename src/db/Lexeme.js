import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

import { sort as calSort } from 'cal-code-util';

export default class Lexeme extends React.PureComponent {
  static contextTypes = {
    lexemes: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    lexemeLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired,
    boolCellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    sortBy: 'id',
    sortDirection: SortDirection.ASC,
    sortedList: this.context.lexemes
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  sortList = ({ sortBy, sortDirection }) => {
    var result =
      sortBy === 'root' || sortBy === 'lexeme'
        ? this.context.lexemes.sortBy(item => item[sortBy], calSort)
        : this.context.lexemes.sortBy(item => item[sortBy]);
    return sortDirection === SortDirection.DESC ? result.reverse() : result;
  };

  sort = ({ sortBy, sortDirection }) => {
    const sortedList = this.sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  render() {
    const minWidth = 902;
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
              rowCount={this.context.lexemeLen}
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
                label="Lexeme"
                dataKey="lexeme"
                minWidth={100}
                width={100}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="1 Suffix"
                dataKey="firstSuffix"
                minWidth={40}
                width={61}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="2 Suffix"
                dataKey="secondSuffix"
                minWidth={40}
                width={61}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="3 Suffix"
                dataKey="thirdSuffix"
                minWidth={40}
                width={61}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Prefix"
                dataKey="prefix"
                minWidth={30}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="1 Vowel"
                dataKey="firstVowel"
                minWidth={30}
                width={63}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="2 Vowel"
                dataKey="secondVowel"
                minWidth={30}
                width={63}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="3 Vowel"
                dataKey="thirdVowel"
                minWidth={30}
                width={63}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="4 Vowel"
                dataKey="fourthVowel"
                minWidth={30}
                width={63}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Radical Type"
                dataKey="radicalType"
                minWidth={70}
                width={90}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Form"
                dataKey="form"
                minWidth={60}
                width={60}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Seyame"
                dataKey="seyame"
                minWidth={34}
                width={64}
                cellRenderer={this.context.boolCellRenderer}
              />
              <Column
                label="Word Type"
                dataKey="wordType"
                minWidth={82}
                width={82}
              />
              <Column
                label="Category"
                dataKey="grammaticalCategory"
                minWidth={105}
                width={105}
              />
              <Column
                label="Listing"
                dataKey="listing"
                minWidth={34}
                width={56}
                cellRenderer={this.context.boolCellRenderer}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
