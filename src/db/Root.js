import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

import { toEstrangela } from 'cal-estrangela';

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
    const minWidth = 376;
    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width < minWidth ? minWidth : width}
              height={height}
              headerHeight={20}
              rowHeight={22}
              rowCount={this.context.rootLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" minWidth={33} width={33} />
              <Column
                label="Root"
                dataKey="root"
                minWidth={99}
                width={99}
                cellDataGetter={obj => toEstrangela(obj.rowData[obj.dataKey])}
                cellRenderer={obj => (
                  <div
                    className="estrangela-cell"
                    title={obj.rowData[obj.dataKey]}
                  >
                    <div className="estrangela">{obj.cellData}</div>
                  </div>
                )}
              />
              <Column
                label="Sort"
                dataKey="sort"
                className="verba"
                minWidth={112}
                width={112}
              />
              <Column
                label="Seyame"
                dataKey="seyame"
                minWidth={30}
                width={60}
              />
              <Column
                label="Root Type"
                dataKey="rootType"
                minWidth={87}
                width={87}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
