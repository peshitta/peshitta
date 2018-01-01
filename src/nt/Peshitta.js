import React from 'react';
import { AutoSizer } from 'react-virtualized';

import PeshittaTable from './PeshittaTable';
import { getBookByEnglish, getIndexByVerse } from 'sedra-model';
import ubs from 'sedrajs/build/sedra/ubs';

export default class Peshitta extends React.PureComponent {
  getIndexByBook(bookId) {
    const matthewId = 52;
    const revelationId = 78;

    const book =
      bookId < matthewId
        ? matthewId
        : bookId > revelationId ? revelationId : bookId;

    let chapter = Number.parseInt(this.props.match.params.chapter, 10);
    if (isNaN(chapter) || chapter < 1) {
      chapter = 1;
    }

    let verse = Number.parseInt(this.props.match.params.verse, 10);
    if (isNaN(verse) || verse < 0) {
      verse = 0;
    }

    const index = getIndexByVerse({ book, chapter, verse }, ubs);
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
      <AutoSizer>
        {({ width, height }) => (
          <PeshittaTable
            width={width}
            height={height}
            scrollToIndex={this.getIndex()}
          />
        )}
      </AutoSizer>
    );
  }
}
