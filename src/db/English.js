import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Table, Column, AutoSizer } from 'react-virtualized';

export default class English extends React.PureComponent {
  static contextTypes = {
    english: PropTypes.instanceOf(Immutable.Seq.Indexed).isRequired,
    englishLen: PropTypes.number.isRequired,

    flexify: PropTypes.instanceOf(Function).isRequired,
    getViewWidth: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellDataGetter: PropTypes.instanceOf(Function).isRequired,
    estrangelaCellRenderer: PropTypes.instanceOf(Function).isRequired,
    cellRenderer: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    const list = this.context.english;
    const minWidth = 1290;

    return (
      <div className="flex-item">
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={this.context.getViewWidth(width, minWidth)}
              height={height}
              headerHeight={22}
              rowHeight={24}
              rowCount={this.context.englishLen}
              rowGetter={({ index }) => list.get(index)}
            >
              <Column label="Id" dataKey="id" minWidth={33} width={33} />
              <Column
                label="Lexeme"
                dataKey="lexeme"
                minWidth={99}
                width={99}
                cellDataGetter={this.context.estrangelaCellDataGetter}
                cellRenderer={this.context.estrangelaCellRenderer}
              />
              <Column
                label="Word"
                dataKey="word"
                minWidth={125}
                width={125}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="String Before Word"
                dataKey="before"
                minWidth={110}
                width={115}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="String After Word"
                dataKey="after"
                minWidth={152}
                width={152}
                cellRenderer={this.context.cellRenderer}
              />

              <Column
                label="Comment"
                dataKey="comment"
                minWidth={200}
                width={200}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Comment Position"
                dataKey="commentPosition"
                minWidth={90}
                width={115}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Comment Font"
                dataKey="commentFont"
                minWidth={40}
                width={95}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Before Font"
                dataKey="stringBeforeFont"
                minWidth={90}
                width={95}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="After Font"
                dataKey="stringAfterFont"
                minWidth={90}
                width={95}
                cellRenderer={this.context.cellRenderer}
              />

              <Column
                label="Verb Type"
                dataKey="verbType"
                minWidth={37}
                width={65}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Number"
                dataKey="number"
                minWidth={50}
                width={55}
                cellRenderer={this.context.cellRenderer}
              />
              <Column
                label="Gender"
                dataKey="gender"
                minWidth={62}
                width={62}
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
                label="Flag"
                dataKey="flag"
                minWidth={30}
                width={40}
                cellRenderer={this.context.cellRenderer}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
