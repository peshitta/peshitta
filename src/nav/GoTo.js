import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import { withRouter } from 'react-router';
import { getBook, getBooksByEnglish, getBookByEnglish } from 'sedra-model';

class GoTo extends React.PureComponent {
  static nonNumeric = /[^0-9]+/;
  static splitRegex = / +|:|\/|-|_|\|/g;
  static englishNames = [];
  static allBookNames = Object.keys(getBooksByEnglish());

  static getEnglishNames = () => {
    if (!GoTo.englishNames.length) {
      for (let id = 52; id < 79; id++) {
        const book = getBook(id);
        GoTo.englishNames.push({
          v: `${book.englishShortName}`,
          l: `${book.englishName} `
        });
      }
    }
    return GoTo.englishNames;
  };

  static getCapitalizedName(name, book) {
    for (let i = 0, len = book.english.length; i < len; i++) {
      const capitalized = book.english[i];
      if (capitalized.toLowerCase() === name) {
        return capitalized;
      }
    }
    return name;
  }

  static getReferences = input => {
    const txt = input && input.trimLeft();
    if (txt) {
      const result = [];
      const split = txt.split(GoTo.splitRegex);
      const book = getBookByEnglish(split[0]);
      if (book) {
        let chapter = split[1];
        if (chapter) {
          if (GoTo.nonNumeric.test(chapter) || chapter < 1) {
            chapter = 1;
          } else if (chapter > book.stats.chapters) {
            chapter = book.stats.chapters;
          }
          let verse = split[2];
          if (verse) {
            if (GoTo.nonNumeric.test(verse) || verse < 1) {
              verse = 1;
            } else if (verse > book.stats.chapter[chapter].verses) {
              verse = book.stats.chapter[chapter].verses;
            }
            result.push({
              v: `${book.englishShortName}/${chapter}/${verse}`,
              l: `${book.englishName} ${chapter}:${verse}`
            });
          } else {
            const verses = book.stats.chapter[chapter].verses;
            for (let i = 1; i <= verses; i++) {
              result.push({
                v: `${book.englishShortName}/${chapter}/${i}`,
                l: `${book.englishName} ${chapter}:${i}`
              });
            }
          }
        } else {
          for (let i = 1; i <= book.stats.chapters; i++) {
            result.push({
              v: `${book.englishShortName}/${i}`,
              l: `${book.englishName} ${i}`
            });
          }
        }
      } else {
        const lowerTxt = txt.toLowerCase();
        for (let i = 0, len = GoTo.allBookNames.length; i < len; i++) {
          const name = GoTo.allBookNames[i];
          if (name.startsWith(lowerTxt)) {
            const book = getBookByEnglish(name);
            const value = book.englishShortName;
            const label = GoTo.getCapitalizedName(name, book);
            result.push({ v: `${value}`, l: `${label} ` });
          }
        }
      }
      return result;
    }
    return GoTo.getEnglishNames();
  };

  state = {
    selected: null
  };

  onChange = selected => {
    this.setState({ selected });
    if (!selected) {
      return;
    }
    this.props.history.push(`/${selected.v}`);
  };

  getOptions = () =>
    this.state.selected
      ? GoTo.getReferences(this.state.selected.v)
      : GoTo.getReferences();

  filterOptions = (options, filter, currentValues) =>
    filter ? GoTo.getReferences(filter) : options;

  render = () => {
    return (
      <VirtualizedSelect
        className="goTo"
        placeholder="Go To"
        valueKey="v"
        labelKey="l"
        options={this.getOptions()}
        onChange={this.onChange}
        filterOptions={this.filterOptions}
        value={this.state.selected}
      />
    );
  };
}

export default withRouter(GoTo);
