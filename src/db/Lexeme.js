import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Lexeme extends React.PureComponent {
  static contextTypes = {
    lexemes: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    lexemeLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.lexemes;
    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.context.lexemeLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" width={40} />
              <Column label="Root" dataKey="root" width={70} />
              <Column label="Lexeme" dataKey="lexeme" width={100} />
              <Column label="1st Suffix" dataKey="firstSuffix" width={40} />
              <Column label="2nd Suffix" dataKey="secondSuffix" width={40} />
              <Column label="3nd Suffix" dataKey="thirdSuffix" width={40} />
              <Column label="Prefix" dataKey="prefix" width={40} />
              <Column label="1st Vowel" dataKey="firstVowel" width={40} />
              <Column label="2nd Vowel" dataKey="secondVowel" width={40} />
              <Column label="3nd Vowel" dataKey="thirdVowel" width={40} />
              <Column label="4nd Vowel" dataKey="fourthVowel" width={40} />
              <Column label="Radical Type" dataKey="radicalType" width={40} />
              <Column label="Form" dataKey="form" width={40} />
              <Column label="Seyame" dataKey="seyame" width={40} />
              <Column label="Word Type" dataKey="wordType" width={40} />
              <Column
                label="Grammatical Category"
                dataKey="grammaticalCategory"
                width={40}
              />
              <Column label="Listing" dataKey="listing" width={40} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
