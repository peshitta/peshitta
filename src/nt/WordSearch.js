import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';

export default class WordSearch extends React.PureComponent {
  state = {
    displayed: false
  };

  onClick = () => {
    this.setState(prevState => ({
      displayed: !prevState.displayed
    }));
  };

  render = () => (
    <div className="flex-input" style={{ ...this.props.style, position: 'relative' }}>
      <i
        className={
          this.state.displayed
            ? 'fa fa-toggle-on fa-2x'
            : 'fa fa-toggle-off fa-2x'
        }
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 2,
          zIndex: 100
        }}
        title="Click to toggle Word Search"
        onClick={this.onClick}
      />
      <VirtualizedSelect
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search - TODO"
        style={{
          width: '100%',
          paddingLeft: '30px',
          display: this.state.displayed ? 'block' : 'none'
        }}
      />
    </div>
  );
}
