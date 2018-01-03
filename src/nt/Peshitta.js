import React from 'react';
import { AutoSizer } from 'react-virtualized';

import PeshittaTable from './PeshittaTable';
import { getBookByEnglish, getIndexByVerse } from 'sedra-model';
import ubs from 'sedrajs/build/sedra/ubs';

const nonNumeric = /[^0-9]+/;

export default class Peshitta extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    this.resetScroll =
      !nextProps.match.params.book && this.props.match.params.book;
  }

  getRowForBook(bookId, props) {
    const matthewId = 52;
    const revelationId = 78;

    const book =
      bookId < matthewId
        ? matthewId
        : bookId > revelationId ? revelationId : bookId;

    let chapter = Number.parseInt(props.match.params.chapter, 10);
    if (isNaN(chapter) || chapter < 1) {
      chapter = 1;
    }

    let verse = Number.parseInt(props.match.params.verse, 10);
    if (isNaN(verse) || verse < 0) {
      verse = 0;
    }

    const index = getIndexByVerse({ book, chapter, verse }, ubs);
    return index >= ubs.chapters + ubs.verses
      ? ubs.chapters + ubs.verses - 1
      : index;
  }

  getScrollToRow() {
    let index = this.resetScroll ? 0 : undefined;
    const p = this.props;
    if (p.match.params.book) {
      const bookId = Number.parseInt(p.match.params.book, 10);
      if (isNaN(bookId) || nonNumeric.test(p.match.params.book)) {
        const book = getBookByEnglish(p.match.params.book) || null;
        if (book) {
          index = this.getRowForBook(book.id, p);
        }
      } else {
        index = this.getRowForBook(bookId, p);
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
            scrollToRow={this.getScrollToRow()}
          />
        )}
      </AutoSizer>
    );
  }
}
