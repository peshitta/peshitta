import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Word extends React.PureComponent {
  static contextTypes = {
    words: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    wordLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.words;
    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={19}
              rowCount={this.context.wordLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" width={50} />
              <Column label="Lexeme" dataKey="lexeme" width={70} />
              <Column label="Word" dataKey="word" width={100} />
              <Column label="Vocalised" dataKey="vocalised" width={140} />
              <Column label="Suffix Gender" dataKey="suffixGender" width={40} />

              <Column label="Suffix Person" dataKey="suffixPerson" width={40} />
              <Column label="Suffix Number" dataKey="suffixNumber" width={40} />
              <Column label="Suffix Type" dataKey="suffixType" width={40} />
              <Column label="Prefix Code" dataKey="prefixCode" width={40} />
              <Column label="Gender" dataKey="gender" width={40} />

              <Column label="Person" dataKey="person" width={40} />
              <Column label="Number" dataKey="number" width={40} />
              <Column label="State" dataKey="state" width={40} />
              <Column label="Tense" dataKey="tense" width={40} />
              <Column label="Form" dataKey="form" width={40} />

              <Column label="Seyame" dataKey="seyame" width={40} />
              <Column label="Listing" dataKey="listing" width={40} />
              <Column label="Enclitic" dataKey="enclitic" width={40} />
              <Column label="Is Lexeme" dataKey="isLexeme" width={50} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
