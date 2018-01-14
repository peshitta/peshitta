import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

import Expander from '../Expander';
import TableSearch from './TableSearch';
import { sort as calSort } from 'cal-code-util';

export default class Lexeme extends React.PureComponent {
  static contextTypes = {
    lexemes: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    lexemeLen: PropTypes.number.isRequired,

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
    sortedList: this.context.lexemes
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

  columns = [
    { value: 'id', label: 'Id' },
    { value: 'root', label: 'Root' },
    { value: 'lexeme', label: 'Lexeme' },
    { value: 'firstSuffix', label: '1 Suffix' },
    { value: 'secondSuffix', label: '2 Suffix' },
    { value: 'thirdSuffix', label: '3 Suffix' },
    { value: 'prefix', label: 'Prefix' },
    { value: 'firstVowel', label: '1 Vowel' },
    { value: 'secondVowel', label: '2 Vowel' },
    { value: 'thirdVowel', label: '3 Vowel' },
    { value: 'fourthVowel', label: '4 Vowel' },
    { value: 'radicalType', label: 'Radical Type' },
    { value: 'form', label: 'Form' },
    { value: 'seyame', label: 'Seyame', flag: true },
    { value: 'wordType', label: 'Word Type' },
    { value: 'grammaticalCategory', label: 'Category' },
    { value: 'listing', label: 'Listing', flag: true }
  ];

  render() {
    const minWidth = 1183;
    const { sortBy, sortDirection, sortedList } = this.state;

    return (
      <React.Fragment>
        <TableSearch
          columns={this.columns}
          columnWidth={145}
          dataLen={this.context.lexemeLen}
          history={this.props.history}
          sort={this.sort}
          sortList={this.sortList}
          table="lexeme"
        />
        <Expander>
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
                  cellRenderer={this.context.estrangelaLinkCellRenderer(
                    'root',
                    'rootId'
                  )}
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
                  minWidth={61}
                  width={61}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="2 Suffix"
                  dataKey="secondSuffix"
                  minWidth={61}
                  width={61}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="3 Suffix"
                  dataKey="thirdSuffix"
                  minWidth={61}
                  width={61}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Prefix"
                  dataKey="prefix"
                  minWidth={50}
                  width={50}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="1 Vowel"
                  dataKey="firstVowel"
                  minWidth={63}
                  width={63}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="2 Vowel"
                  dataKey="secondVowel"
                  minWidth={63}
                  width={63}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="3 Vowel"
                  dataKey="thirdVowel"
                  minWidth={63}
                  width={63}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="4 Vowel"
                  dataKey="fourthVowel"
                  minWidth={63}
                  width={63}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Radical Type"
                  dataKey="radicalType"
                  minWidth={90}
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
                  minWidth={64}
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
                  minWidth={111}
                  width={111}
                />
                <Column
                  label="Listing"
                  dataKey="listing"
                  minWidth={56}
                  width={56}
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
