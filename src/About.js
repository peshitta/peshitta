import React from 'react';

const About = () => (
  <div class="container">
    <div class="home">
      <p style={{ textAlign: 'center' }}>Welcome to Peshitta Web Application</p>
      <p>
        Search queries can be entered using the following consonant, vowel and
        diacritics ASCII mapping:
      </p>
      Consonants
      <table class="table table-bordered table-striped table-responsive">
        <tr>
          <th style={{ textAlign: 'left', fontWeight: 'normal' }}>
            <a
              href="http://cal.huc.edu/searching/fullbrowser.html"
              target="_blank"
            >
              CAL
            </a>
          </th>
          <th title="ܐ">)</th>
          <th title="ܒ">b</th>
          <th title="ܓ">g</th>
          <th title="ܕ">d</th>
          <th title="ܗ">h</th>
          <th title="ܘ">w</th>
          <th title="ܙ">z</th>
          <th title="ܚ">x</th>
          <th title="ܛ">T</th>
          <th title="ܝ">y</th>
          <th title="ܟ">k</th>
          <th title="ܠ">l</th>
          <th title="ܡ">m</th>
          <th title="ܢ">n</th>
          <th title="ܣ">s</th>
          <th title="ܥ">(</th>
          <th title="ܦ">p</th>
          <th title="ܨ">c</th>
          <th title="ܩ">q</th>
          <th title="ܪ">r</th>
          <th title="ܫ">$</th>
          <th title="ܬ">t</th>
        </tr>

        <tr>
          <td style={{ textAlign: 'left' }}>Aramaic</td>
          <td class="str" title=")">
            0
          </td>
          <td class="str" title="b">
            B
          </td>
          <td class="str" title="g">
            G
          </td>
          <td class="str" title="d">
            d
          </td>
          <td class="str" title="h">
            h
          </td>
          <td class="str" title="w">
            w
          </td>
          <td class="str" title="z">
            z
          </td>
          <td class="str" title="x">
            X
          </td>
          <td class="str" title="T">
            +
          </td>
          <td class="str" title="y">
            Y
          </td>
          <td class="str" title="k">
            &lt;
          </td>
          <td class="str" title="l">
            L
          </td>
          <td class="str" title="m">
            M
          </td>
          <td class="str" title="n">
            J
          </td>
          <td class="str" title="s">
            S
          </td>
          <td class="str" title="(">
            (
          </td>
          <td class="str" title="p">
            P
          </td>
          <td class="str" title="c">
            c
          </td>
          <td class="str" title="q">
            Q
          </td>
          <td class="str" title="r">
            r
          </td>
          <td class="str" title="$">
            $
          </td>
          <td class="str" title="t">
            t
          </td>
        </tr>
      </table>
      Vowels
      <table class="table table-bordered table-striped table-responsive">
        <tr>
          <th title="ܐܲ">a</th>
          <th title="ܐܵ">o</th>
          <th title="ܐܹ">e</th>
          <th title="ܝܼ">i</th>
          <th title="ܘܼ">u</th>
          <th title="ܐܸ">E</th>
          <th title="ܘܿ">O</th>
        </tr>
        <tr>
          <td title="a" class="str">
            &nbsp;e
          </td>
          <td title="o" class="str">
            &nbsp;a
          </td>
          <td title="e" class="str">
            &nbsp;o
          </td>
          <td title="i" class="str">
            y;
          </td>
          <td title="u" class="str">
            w;
          </td>
          <td title="E" class="str">
            &nbsp;i
          </td>
          <td title="O" class="str">
            wu
          </td>
        </tr>
      </table>
      Diacritics
      <table class="table table-bordered table-striped table-responsive">
        <tr style={{ fontSize: 'x-large' }}>
          <th title="ܒ݁">'</th>
          <th title="ܒ݂">,</th>
          <th title="ܒ݈">_</th>
          <th title="ܒ̈">*</th>
        </tr>
        <tr class="str">
          <td title="'" class="str">
            B2
          </td>
          <td title="," class="str">
            B3
          </td>
          <td title="_" class="str">
            B5
          </td>
          <td title="*" class="str">
            B6
          </td>
        </tr>
      </table>
      <p>
        Project home is found at{' '}
        <a href="https://github.com/peshitta/peshitta" target="_blank">
          https://github.com/peshitta/peshitta
        </a>.
      </p>
    </div>
    <div class="footer text-muted">
      <p>
        This work makes use of the Syriac Electronic Data Retrieval Archive
        (SEDRA) by George A. Kiraz, distributed by the{' '}
        <a href="https://sedra.bethmardutho.org/" target="_blank">
          Syriac Computing Institute.
        </a>
      </p>
      <p>
        For additional information on the structure of the Database, see G.
        Kiraz, '<i>Automatic Concordance Generation of Syriac Texts</i>', in{' '}
        <i>VI Symposium Syriacum 1992</i>, ed. R. Lavenant, Orientalia
        Christiana Analecta 247, Rome, 1994.
      </p>
    </div>
  </div>
);

export default About;
