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

  getIndexByBook(bookId) {
    const matthewId = 52;
    const revelationId = 78;

    const book =
      bookId < matthewId
        ? matthewId
        : bookId > revelationId ? revelationId : bookId;

    let chapter = Number.parseInt(this.props.match.params.chapter, 10);
    if (isNaN(chapter) || chapter < 0) {
      chapter = 0;
    }

    let verse = Number.parseInt(this.props.match.params.verse, 10);
    if (isNaN(verse) || verse < 0) {
      verse = 0;
    }

    const index = getIndexByVerseWithChapters({ book, chapter, verse }, ubs);
    return index >= ubs.chapters + ubs.verses
      ? ubs.chapters + ubs.verses - 1
      : index;
  }

  getIndex() {
    let index = 0;
    if (this.props.match.params.book) {
      const bookId = Number.parseInt(this.props.match.params.book, 10);
      if (isNaN(bookId)) {
        const book = getBookByEnglish(this.props.match.params.book) || null;
        if (book) {
          index = this.getIndexByBook(book.id);
        }
      } else {
        index = this.getIndexByBook(bookId);
      }
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
