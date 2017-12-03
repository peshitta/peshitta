import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Etymology extends React.PureComponent {
  static contextTypes = {
    etymology: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    etymologyLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.etymology;
    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={24}
              rowCount={this.context.etymologyLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" width={40} />
              <Column label="Lexeme" dataKey="lexeme" width={70} />
              <Column label="Word" dataKey="word" width={140} />
              <Column label="Language" dataKey="language" width={40} />
              <Column label="Word Type" dataKey="wordType" width={40} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
