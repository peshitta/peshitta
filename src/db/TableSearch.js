import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import { SortDirection } from 'react-virtualized';
import Immutable from 'immutable';

const columnData = {
  'root': {},
  'lexeme': {},
  'word': {},
  'english': {},
  'etymology': {}
};

export default class TableSearch extends React.PureComponent {
  state = {
    column: null,
    find: null,
    finds: null
  };

   onColumnChange = column => {
    this.setState({ column, find: null });
    if (column) {
      const table = this.props.table;
      const value = column.value;
      if (!columnData[table][value]) {
        const isId = value === 'id';
        const data = this.props.sortList({
          sortBy: value,
          sortDirection: SortDirection.ASC
        });
        let set = isId ? null : new Immutable.Set();
        const c = (columnData[table][value] = []);
        for (let i = 0, len = this.props.dataLen; i < len; i++) {
          const r = data.get(i);
          const label = column.flag ? (r[value] ? 'Yes' : 'No') : r[value];
          if (isId) {
            c.push({ v: r.id, l: label });
          } else if (!set.has(label)) {
            set = set.add(label);
            c.push({ v: r.id, l: label });
          }
        }
      }
      this.setState({ finds: columnData[table][value] });
    } else {
      this.setState({ finds: null });
    }
  };

  onFindChange = find => {
    this.props.sort({
      sortBy: this.state.column.value,
      sortDirection: SortDirection.ASC
    });
    this.setState({ find });
    find && this.props.history.push(`/${this.props.table}/${find.v}`);
  };

  render = () => (
    <div className="flex-line">
      <div style={{ minWidth: `${this.props.columnWidth}px` }}>
        <VirtualizedSelect
          placeholder="Column"
          options={this.props.columns}
          onChange={this.onColumnChange}
          value={this.state.column}
        />
      </div>
      <div className="flex-input">
        <VirtualizedSelect
          placeholder={`Find ${
            this.state.column === null ? 'Column' : this.state.column.label
          }`}
          valueKey="v"
          labelKey="l"
          options={this.state.finds}
          onChange={this.onFindChange}
          value={this.state.find}
          matchPos="start"
          matchProp="label"
        />
      </div>
    </div>
  );
}
