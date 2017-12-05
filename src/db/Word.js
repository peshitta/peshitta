import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer, SortDirection } from 'react-virtualized';

export default class Word extends React.PureComponent {
  static contextTypes = {
    words: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    wordLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired,
    boolCellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired,
    getSortList: PropTypes.instanceOf(Function).isRequired
  };

  state = {
    sortBy: 'id',
    sortDirection: SortDirection.ASC,
    sortedList: this.context.words
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  sortList = this.context.getSortList(this.context.words);

  sort = ({ sortBy, sortDirection }) => {
    const sortedList = this.sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  render() {
    const minWidth = 1213;
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
              rowCount={this.context.wordLen}
              rowGetter={({ index }) => sortedList.get(index)}
              rowClassName={this.context.rowClassName}
              sort={this.sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            >
              <Column label="Id" dataKey="id" minWidth={40} width={40} />
              <Column
                label="Lexeme"
                dataKey="lexeme"
                minWidth={100}
                width={100}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
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
                minWidth={45}
                width={92}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Suffix Number"
                dataKey="suffixNumber"
                minWidth={95}
                width={102}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Suffix Type"
                dataKey="suffixType"
                minWidth={70}
                width={80}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Prefix"
                dataKey="prefixCode"
                minWidth={30}
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
                minWidth={45}
                width={57}
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
                label="State"
                dataKey="state"
                minWidth={60}
                width={60}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Tense"
                dataKey="tense"
                minWidth={95}
                width={95}
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
                label="Seyame"
                dataKey="seyame"
                minWidth={34}
                width={64}
                cellRenderer={this.context.boolCellRenderer}
              />
              <Column
                label="Listing"
                dataKey="listing"
                minWidth={30}
                width={56}
              />
              <Column
                label="Enclitic"
                dataKey="enclitic"
                minWidth={34}
                width={58}
                cellRenderer={this.context.boolCellRenderer}
              />
              <Column
                label="IsLexeme"
                dataKey="isLexeme"
                minWidth={34}
                width={72}
                cellRenderer={this.context.boolCellRenderer}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
