import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

import Expander from '../Expander';
import TableSearch from './TableSearch';
import { sort as calSort } from 'cal-code-util';

export default class Word extends React.PureComponent {
  static contextTypes = {
    words: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    wordLen: PropTypes.number.isRequired,

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
    sortedList: this.context.words
  };

  sortList = ({ sortBy, sortDirection }) => {
    var result =
      sortBy === 'lexeme' || sortBy === 'word' || sortBy === 'vocalised'
        ? this.context.words.sortBy(item => item[sortBy], calSort)
        : this.context.words.sortBy(item => item[sortBy]);
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
    { value: 'vocalised', label: 'Vocalised' },
    { value: 'suffixGender', label: 'Suffix Gender' },
    { value: 'suffixPerson', label: 'Suffix Person' },
    { value: 'suffixNumber', label: 'Suffix Number' },
    { value: 'suffixType', label: 'Suffix Type' },
    { value: 'prefixCode', label: 'Prefix' },
    { value: 'gender', label: 'Gender' },
    { value: 'person', label: 'Person' },
    { value: 'number', label: 'Number' },
    { value: 'state', label: 'State' },
    { value: 'tense', label: 'Tense' },
    { value: 'form', label: 'Form' },
    { value: 'seyame', label: 'Seyame', flag: true },
    { value: 'listing', label: 'Listing' },
    { value: 'enclitic', label: 'Enclitic', flag: true },
    { value: 'isLexeme', label: 'IsLexeme', flag: true }
  ];

  render() {
    const minWidth = 1438;
    const { sortBy, sortDirection, sortedList } = this.state;

    return (
      <React.Fragment>
        <TableSearch
          columns={this.columns}
          columnWidth={160}
          dataLen={this.context.wordLen}
          history={this.props.history}
          sort={this.sort}
          sortList={this.sortList}
          table="word"
        />
        <Expander>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                width={this.context.getViewWidth(width, minWidth)}
                height={height}
                headerHeight={21}
                rowHeight={24}
                rowCount={this.context.wordLen}
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
                <Column label="Id" dataKey="id" minWidth={40} width={40} />
                <Column
                  label="Lexeme"
                  dataKey="lexeme"
                  minWidth={100}
                  width={100}
                  cellDataGetter={this.context.estrangelaCellDataGetter}
                  cellRenderer={this.context.estrangelaLinkCellRenderer(
                    'lexeme',
                    'lexemeId'
                  )}
                />
                <Column
                  label="Word"
                  dataKey="word"
                  minWidth={105}
                  width={105}
                  cellDataGetter={this.context.estrangelaCellDataGetter}
                  cellRenderer={this.context.estrangelaCellRenderer}
                />
                <Column
                  label="Vocalised"
                  dataKey="vocalised"
                  minWidth={106}
                  width={106}
                  cellDataGetter={this.context.estrangelaCellDataGetter}
                  cellRenderer={this.context.estrangelaCellRenderer}
                />
                <Column
                  label="Suffix Gender"
                  dataKey="suffixGender"
                  minWidth={100}
                  width={100}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Suffix Person"
                  dataKey="suffixPerson"
                  minWidth={92}
                  width={92}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Suffix Number"
                  dataKey="suffixNumber"
                  minWidth={102}
                  width={102}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Suffix Type"
                  dataKey="suffixType"
                  minWidth={80}
                  width={80}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Prefix"
                  dataKey="prefixCode"
                  minWidth={50}
                  width={50}
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
                  label="Person"
                  dataKey="person"
                  minWidth={57}
                  width={57}
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
                  label="State"
                  dataKey="state"
                  minWidth={60}
                  width={60}
                  cellRenderer={this.context.cellRenderer}
                />
                <Column
                  label="Tense"
                  dataKey="tense"
                  minWidth={100}
                  width={100}
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
                  label="Seyame"
                  dataKey="seyame"
                  minWidth={64}
                  width={64}
                  cellRenderer={this.context.boolCellRenderer}
                />
                <Column
                  label="Listing"
                  dataKey="listing"
                  minWidth={56}
                  width={56}
                />
                <Column
                  label="Enclitic"
                  dataKey="enclitic"
                  minWidth={58}
                  width={58}
                  cellRenderer={this.context.boolCellRenderer}
                />
                <Column
                  label="IsLexeme"
                  dataKey="isLexeme"
                  minWidth={72}
                  width={72}
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
