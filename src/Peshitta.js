import React from 'react';
import PropTypes from 'prop-types';

class Peshitta extends React.PureComponent {
  static contextTypes = {
    flexify: PropTypes.instanceOf(Function).isRequired
  };

  componentWillMount = () => {
    this.context.flexify(false);
  };

  render = () => (
    <div className="container">
      <p>Welcome to Peshitta Web Application.</p>
      <p>
        This is currently work in progress. Following pages are ready to use:
      </p>
      <ul>
        <li>
          <a href="#text">Convert Text</a> - convert text to different
          representations
        </li>
        <li>
          <a href="#number">Convert Number</a> - convert number to/from Aramaic
          letters
        </li>
        <li>
          <a href="#about">About</a> - pronunciation and character mapping
        </li>
      </ul>
      Feel free to browse other unfinished pages to get a sense for where the
      implementation is going.
    </div>
  );
}

export default Peshitta;
