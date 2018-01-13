import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';

export default class TableSearch extends React.PureComponent {
  state = {
    column: null,
    find: null,
    finds: null
  };

  findsByColumn = {};

  onColumnChange = column => {
    this.setState({ column, find: null });
    if (column) {
      const value = column.value;
      if (!this.findsByColumn[value]) {
        const c = (this.findsByColumn[value] = []);
        for (let i = 0, len = this.props.dataLen; i < len; i++) {
          const r = this.props.data.get(i);
          c.push({ v: r.id, l: r[value] + '' });
        }
      }
      this.setState({ finds: this.findsByColumn[value] });
    } else {
      this.setState({ finds: null });
    }
  };

  onFindChange = find => {
    if (this.state.column.unique) {
      this.props.history.push(`/${this.props.table}/${find.v}`);
    }
    else {
      this.props.history.push(`/${this.props.table}/${find.v}`);
    }
    this.setState({ find });
  };

  render = () => (
    <div className="flex-line">
      <div style={{ minWidth: '190px' }}>
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
        />
      </div>
    </div>
  );
}
