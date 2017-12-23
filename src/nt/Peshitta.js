import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import PeshittaTable from './PeshittaTable';

import ubs from 'sedrajs/build/sedra/ubs';

export default class Peshitta extends React.PureComponent {
  static contextTypes = {
    flexify: PropTypes.instanceOf(Function).isRequired
  };

  getReference = (book, chapter, verse) =>
    Object.freeze(
      Object.create(null, {
        book: { value: book, enumerable: true },
        chapter: { value: chapter, enumerable: true },
        verse: { value: verse, enumerable: true }
      })
    );

  getIndexReference = () => {
    const firstBook = 52;
    const lastBook = firstBook + (ubs.books - 1);
    const indexReference = [];
    for (let book = firstBook; book <= lastBook; book++) {
      const b = ubs[book];
      for (let chapter = 1; chapter <= b.chapters; chapter++) {
        indexReference.push(this.getReference(book, chapter, 0));
        const c = b[chapter];
        for (let verse = 1; verse <= c.verses; verse++) {
          indexReference.push(this.getReference(book, chapter, verse));
        }
      }
    }
    return indexReference;
  };

  componentWillMount = () => {
    this.context.flexify(true);
  };

  render() {
    return (
      <div className="flex-item text-right">
        <AutoSizer>
          {({ width, height }) => (
            <PeshittaTable
              width={width}
              height={height}
              indexReference={this.getIndexReference()}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
