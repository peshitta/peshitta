import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Lexeme extends React.PureComponent {
  static contextTypes = {
    lexemes: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    lexemeLen: PropTypes.number.isRequired,

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
    const list = this.context.lexemes;
    const minWidth = 900;

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
              rowGetter={({ index }) => list.get(index)}
              rowClassName={this.context.rowClassName}
            >
              <Column label="Id" dataKey="id" minWidth={33} width={33} />
              <Column
                label="Root"
                dataKey="root"
                minWidth={99}
                width={99}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="Lexeme"
                dataKey="lexeme"
                minWidth={99}
                width={99}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="1 Suffix"
                dataKey="firstSuffix"
                minWidth={40}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="2 Suffix"
                dataKey="secondSuffix"
                minWidth={40}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="3 Suffix"
                dataKey="thirdSuffix"
                minWidth={40}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Prefix"
                dataKey="prefix"
                minWidth={30}
                width={37}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="1 Vowel"
                dataKey="firstVowel"
                minWidth={30}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="2 Vowel"
                dataKey="secondVowel"
                minWidth={30}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="3 Vowel"
                dataKey="thirdVowel"
                minWidth={30}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="4 Vowel"
                dataKey="fourthVowel"
                minWidth={30}
                width={50}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Radical Type"
                dataKey="radicalType"
                minWidth={70}
                width={78}
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
                width={43}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
