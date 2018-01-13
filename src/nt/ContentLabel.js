import React from 'react';
import { getBook } from 'sedra-model';

export default class ContentLabel extends React.PureComponent {
  static contentLabel = ({
    startBook,
    startChapter,
    startVerse,
    endBook,
    endChapter,
    endVerse
  }) => {
    const revision = 'UBS';
    const startEnglish = getBook(startBook).englishName;
    const startRef = `${startChapter}:${startVerse}`;
    const endRef = `${endChapter}:${endVerse}`;
    const start = `${startEnglish} ${startRef} - `;
    const end = `${endRef} ${revision}`;
    return startBook === endBook
      ? `${start}${end}`
      : `${start}${getBook(endBook).englishName} ${end}`;
  };

  render = () => {
    const p = this.props;
    const label =
      p.startBook && p.endBook ? ContentLabel.contentLabel(p) : '\u00A0';
    return (
      <div className="content-label">
        <span title="Content">{label}</span>
      </div>
    );
  };
}
