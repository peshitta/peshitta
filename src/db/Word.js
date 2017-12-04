import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Word extends React.PureComponent {
  static contextTypes = {
    words: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    wordLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired,
    rowClassName: PropTypes.instanceOf(Function).isRequired,
    getSortList: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.words;
    const minWidth = 1196;

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
              rowGetter={({ index }) => list.get(index)}
              rowClassName={this.context.rowClassName}
            >
              <Column label="Id" dataKey="id" minWidth={40} width={40} />
              <Column
                label="Lexeme"
                dataKey="lexeme"
                minWidth={99}
                width={99}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="Word"
                dataKey="word"
                minWidth={100}
                width={100}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="Vocalised"
                dataKey="vocalised"
                minWidth={100}
                width={100}
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
                width={80}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Suffix Number"
                dataKey="suffixNumber"
                minWidth={95}
                width={95}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Suffix Type"
                dataKey="suffixType"
                minWidth={70}
                width={70}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Prefix Code"
                dataKey="prefixCode"
                minWidth={30}
                width={73}
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
                width={45}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Number"
                dataKey="number"
                minWidth={50}
                width={55}
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
                minWidth={57}
                width={57}
                cellRenderer={this.context.cellRenderer}
              />

              <Column
                label="Seyame"
                dataKey="seyame"
                minWidth={34}
                width={50}
              />
              <Column
                label="Listing"
                dataKey="listing"
                minWidth={30}
                width={45}
              />
              <Column
                label="Enclitic"
                dataKey="enclitic"
                minWidth={34}
                width={50}
              />
              <Column
                label="IsLexeme"
                dataKey="isLexeme"
                minWidth={34}
                width={60}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
