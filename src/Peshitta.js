import React from 'react';

const Peshitta = () => (
  <div class="container">
    <p>Welcome to Peshitta Web Application.</p>
    <p>This is currently work in progress. Following pages are ready to use:</p>
    <ul>
      <li>
        <a href="#/map/text">Convert Text</a> - convert text to different
        representations
      </li>
      <li>
        <a href="#/map/number">Convert Number</a> - convert number to/from
        Aramaic letters
      </li>
      <li>
        <a href="#/about">About</a> - pronunciation and character mapping
      </li>
    </ul>
    Feel free to browse other unfinished pages to get a sense for where the
    implementation is going.
  </div>
);

export default Peshitta;
