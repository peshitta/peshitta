import React from 'react';
import { AutoSizer } from 'react-virtualized';

import Expander from '../Expander';
import PeshittaTable from './PeshittaTable';
import { getBookByEnglish, getIndexByVerse } from 'sedra-model';
import WordSearch from './WordSearch';
import ContentLabel from './ContentLabel';
import ubs from 'sedrajs/build/sedra/ubs';

const nonNumeric = /[^0-9]+/;

export default class Peshitta extends React.PureComponent {
  static getRowForBook(bookId, props) {
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

  constructor(props, context) {
    super(props, context);

    const scrollToRow = this.getScrollToRow(props, false);
    this.state = {
      startBook: 52,
      startChapter: 1,
      startVerse: 1,
      endBook: 52,
      endChapter: 2,
      endVerse: 1,
      scrollToRow
    };
  }

  componentWillReceiveProps(nextProps) {
    const resetScroll =
      !nextProps.match.params.book && this.props.match.params.book;
    const scrollToRow = this.getScrollToRow(nextProps, resetScroll);
    if (scrollToRow !== this.state.scrollToRow) {
      this.setState({ scrollToRow });
    }
  }

  getScrollToRow = (props, resetScroll) => {
    let index = resetScroll ? 0 : undefined;
    if (props.match.params.book) {
      const bookId = Number.parseInt(props.match.params.book, 10);
      if (isNaN(bookId) || nonNumeric.test(props.match.params.book)) {
        const book = getBookByEnglish(props.match.params.book) || null;
        if (book) {
          index = Peshitta.getRowForBook(book.id, props);
        }
      } else {
        index = Peshitta.getRowForBook(bookId, props);
      }
    }
    return index;
  };

  setLabel = (start, end) => {
    this.setState({
      startBook: start.book,
      startChapter: start.chapter,
      startVerse: start.verse || 1,
      endBook: end.book,
      endChapter: end.chapter,
      endVerse: end.verse || 1
    });
  };

  render = () => (
    <React.Fragment>
      <div className="flex-line">
        <WordSearch style={{display: 'none'}} />
        <ContentLabel
          startBook={this.state.startBook}
          startChapter={this.state.startChapter}
          startVerse={this.state.startVerse}
          endBook={this.state.endBook}
          endChapter={this.state.endChapter}
          endVerse={this.state.endVerse}
        />
      </div>
      <Expander>
        <AutoSizer>
          {({ width, height }) => (
            <PeshittaTable
              width={width}
              height={height}
              scrollToRow={this.state.scrollToRow}
              setLabel={this.setLabel}
            />
          )}
        </AutoSizer>
      </Expander>
    </React.Fragment>
  );
}
