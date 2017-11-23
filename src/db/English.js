import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class English extends React.PureComponent {
  static contextTypes = {
    english: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    englishLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.english;
    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.context.englishLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" width={40} />
              <Column label="Lexeme" dataKey="lexeme" width={70} />
              <Column label="Word" dataKey="word" width={140} />
              <Column label="Before" dataKey="before" width={40} />
              <Column label="After" dataKey="after" width={40} />

              <Column label="Comment" dataKey="comment" width={40} />
              <Column label="Position" dataKey="commentPosition" width={40} />
              <Column label="Comment Font" dataKey="commentFont" width={40} />
              <Column
                label="String Before Font"
                dataKey="stringBeforeFont"
                width={40}
              />
              <Column
                label="String After Font"
                dataKey="stringAfterFont"
                width={40}
              />

              <Column label="Verb Type" dataKey="verbType" width={40} />
              <Column label="Number" dataKey="number" width={40} />
              <Column label="Gender" dataKey="gender" width={40} />
              <Column label="Form" dataKey="form" width={40} />
              <Column label="Flag" dataKey="flag" width={40} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
