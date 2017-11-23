import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class Root extends React.PureComponent {
  static contextTypes = {
    roots: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    rootLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.roots;
    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.context.rootLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" width={40} />
              <Column label="Root" dataKey="root" width={100} />
              <Column label="Sort" dataKey="sort" width={100} />
              <Column label="Seyame" dataKey="seyame" width={70} />
              <Column label="Root Type" dataKey="rootType" width={100} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
