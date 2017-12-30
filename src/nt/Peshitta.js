import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import PeshittaTable from './PeshittaTable';

import { getBookByEnglish, getIndexByVerseWithChapters } from 'sedra-model';
import ubs from 'sedrajs/build/sedra/ubs';

export default class Peshitta extends React.PureComponent {
  static contextTypes = {
    flexify: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  getIndex() {
    let index = 0;
    const book = this.props.match.params.book
      ? getBookByEnglish(this.props.match.params.book)
      : null;
    if (book) {
      index = getIndexByVerseWithChapters(
        {
          book: book.id,
          chapter: Number.parseInt(this.props.match.params.chapter, 10) || 0,
          verse: Number.parseInt(this.props.match.params.verse, 10) || 0
        },
        ubs
      );
      index =
        index >= ubs.chapters + ubs.verses
          ? ubs.chapters + ubs.verses - 1
          : index;
    }
    return index;
  }

  render() {
    return (
      <div className="flex-item text-right">
        <AutoSizer>
          {({ width, height }) => (
            <PeshittaTable
              width={width}
              height={height}
              scrollToIndex={this.getIndex()}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
