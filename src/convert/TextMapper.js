import React from 'react';
import { Button, ButtonGroup, FormGroup, Input, Container } from 'reactstrap';

import { removeDotting as calRemoveDotting } from 'cal-code-util';
import { removeDotting as sedraRemoveDotting } from 'sedra-code-util';
import { removeDotting as estrangelaRemoveDotting } from 'estrangela-code-util';
import { removeDotting as syriacRemoveDotting } from 'syriac-code-util';
import { removeDotting as hebrewRemoveDotting } from 'hebrew-code-util';
import { removeDotting as arabicRemoveDotting } from 'arabic-code-util';

import { toEstrangela } from 'cal-estrangela';
import { toSedra } from 'cal-sedra';
import { toWesternSyriac as toSyriac } from 'cal-syriac';
import { toHebrew } from 'cal-hebrew';
import { toArabic } from 'cal-arabic';
import { toIpa } from 'cal-ipa';
import { toPhonetic as toLatin } from 'cal-phonetic';

import { toCal as estrangelaToCal } from 'estrangela-cal';
import { toCal as sedraToCal } from 'sedra-cal';
import { toCal as syriacToCal } from 'syriac-cal';
import { toCal as hebrewToCal } from 'hebrew-cal';
import { toCal as arabicToCal } from 'arabic-cal';

export default class TextMapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      output: '',
      niqqud: true,
      inputCode: 'estrangela',
      outputCode: 'ipa'
    };
  }

  handleInputCodeClick = event => {
    const inputCode = event.target.dataset['code'];
    const outputCode =
      this.state.niqqud && inputCode === this.state.outputCode
        ? 'ipa'
        : this.state.outputCode;
    this.setState({ inputCode, outputCode, output: '' });
  };

  handleSourceChange = event => {
    this.setState({ input: event.target.value.trim() });
  };

  handleOutputCodeClick = event => {
    const outputCode = event.target.dataset['code'];
    this.setState({ outputCode, output: '' });
  };

  handleNiqqudClick = () => {
    const niqqud = !this.state.niqqud;
    const outputCode =
      niqqud && this.state.inputCode === this.state.outputCode
        ? 'ipa'
        : this.state.outputCode;
    this.setState({ niqqud, outputCode, output: '' });
  };

  handleConvert = () => {
    const inputCode = this.state.inputCode;
    const outputCode = this.state.outputCode;
    const text = this.state.input;
    const clearDotting =
      !this.state.niqqud && outputCode !== 'ipa' && outputCode !== 'latin';

    let output = '';
    switch (inputCode) {
      case 'estrangela':
        output = clearDotting ? estrangelaRemoveDotting(text) : text;
        switch (outputCode) {
          case 'ipa':
            output = toIpa(estrangelaToCal(output));
            break;
          case 'latin':
            output = toLatin(estrangelaToCal(output));
            break;
          case 'syriac':
            output = toSyriac(estrangelaToCal(output));
            break;
          case 'hebrew':
            output = toHebrew(estrangelaToCal(output));
            break;
          case 'arabic':
            output = toArabic(estrangelaToCal(output));
            break;
          case 'cal':
            output = estrangelaToCal(output);
            break;
          case 'sedra':
            output = toSedra(estrangelaToCal(output));
            break;
          default:
            break;
        }
        break;
      case 'syriac':
        output = clearDotting ? syriacRemoveDotting(text) : text;
        switch (outputCode) {
          case 'ipa':
            output = toIpa(syriacToCal(output));
            break;
          case 'latin':
            output = toLatin(syriacToCal(output));
            break;
          case 'estrangela':
            output = toEstrangela(syriacToCal(output));
            break;
          case 'hebrew':
            output = toHebrew(syriacToCal(output));
            break;
          case 'arabic':
            output = toArabic(syriacToCal(output));
            break;
          case 'cal':
            output = syriacToCal(output);
            break;
          case 'sedra':
            output = toSedra(syriacToCal(output));
            break;
          default:
            break;
        }
        break;
      case 'hebrew':
        output = clearDotting ? hebrewRemoveDotting(text) : text;
        switch (outputCode) {
          case 'ipa':
            output = toIpa(hebrewToCal(output));
            break;
          case 'latin':
            output = toLatin(hebrewToCal(output));
            break;
          case 'estrangela':
            output = toEstrangela(hebrewToCal(output));
            break;
          case 'syriac':
            output = toSyriac(hebrewToCal(output));
            break;
          case 'arabic':
            output = toArabic(hebrewToCal(output));
            break;
          case 'cal':
            output = hebrewToCal(output);
            break;
          case 'sedra':
            output = toSedra(hebrewToCal(output));
            break;
          default:
            break;
        }
        break;
      case 'arabic':
        output = clearDotting ? arabicRemoveDotting(text) : text;
        switch (outputCode) {
          case 'ipa':
            output = toIpa(arabicToCal(text));
            break;
          case 'latin':
            output = toLatin(arabicToCal(text));
            break;
          case 'estrangela':
            output = toEstrangela(arabicToCal(text));
            break;
          case 'syriac':
            output = toSyriac(arabicToCal(text));
            break;
          case 'hebrew':
            output = toHebrew(arabicToCal(text));
            break;
          case 'cal':
            output = arabicToCal(text);
            break;
          case 'sedra':
            output = toSedra(arabicToCal(text));
            break;
          default:
            break;
        }
        break;
      case 'cal':
        output = clearDotting ? calRemoveDotting(text) : text;
        switch (outputCode) {
          case 'ipa':
            output = toIpa(output);
            break;
          case 'latin':
            output = toLatin(output);
            break;
          case 'estrangela':
            output = toEstrangela(output);
            break;
          case 'syriac':
            output = toSyriac(output);
            break;
          case 'hebrew':
            output = toHebrew(output);
            break;
          case 'arabic':
            output = toArabic(output);
            break;
          case 'sedra':
            output = toSedra(output);
            break;
          default:
            break;
        }
        break;
      case 'sedra':
        output = clearDotting ? sedraRemoveDotting(text) : text;
        switch (outputCode) {
          case 'ipa':
            output = toIpa(sedraToCal(output));
            break;
          case 'latin':
            output = toLatin(sedraToCal(output));
            break;
          case 'estrangela':
            output = toEstrangela(sedraToCal(output));
            break;
          case 'syriac':
            output = toSyriac(sedraToCal(output));
            break;
          case 'hebrew':
            output = toHebrew(sedraToCal(output));
            break;
          case 'arabic':
            output = toArabic(sedraToCal(output));
            break;
          case 'cal':
            output = sedraToCal(output);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    this.setState({ output });
  };

  getClassByCode(code) {
    switch (code) {
      case 'estrangela':
      case 'syriac':
        return code;
      case 'hebrew':
      case 'arabic':
        return 'semitic';
      default:
        return '';
    }
  }

  render() {
    return (
      <Container>
        <FormGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="estrangela"
              onClick={this.handleInputCodeClick}
              active={this.state.inputCode === 'estrangela'}
              title="Estrangela ASCII code"
            >
              Estrangela
            </Button>
            <Button
              color="light"
              data-code="syriac"
              onClick={this.handleInputCodeClick}
              active={this.state.inputCode === 'syriac'}
              title="Syriac Unicode"
            >
              Syriac
            </Button>
            <Button
              color="light"
              data-code="hebrew"
              onClick={this.handleInputCodeClick}
              active={this.state.inputCode === 'hebrew'}
              title="Hebrew Unicode"
            >
              Hebrew
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="arabic"
              onClick={this.handleInputCodeClick}
              active={this.state.inputCode === 'arabic'}
              title="Arabic Unicode"
            >
              Arabic
            </Button>
            <Button
              color="light"
              data-code="cal"
              onClick={this.handleInputCodeClick}
              active={this.state.inputCode === 'cal'}
              title="CAL ASCII Code"
            >
              CAL Code
            </Button>
            <Button
              color="light"
              data-code="sedra"
              onClick={this.handleInputCodeClick}
              active={this.state.inputCode === 'sedra'}
              title="Sedra ASCII Code"
            >
              Sedra
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            rows="3"
            title="Source text"
            className={this.getClassByCode(this.state.inputCode)}
            onChange={this.handleSourceChange}
          />
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="ipa"
              onClick={this.handleOutputCodeClick}
              active={this.state.outputCode === 'ipa'}
              title="IPA Unicode"
            >
              IPA code
            </Button>
            <Button
              color="light"
              data-code="latin"
              onClick={this.handleOutputCodeClick}
              active={this.state.outputCode === 'latin'}
              title="Latin Unicode"
            >
              Latin
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="estrangela"
              onClick={this.handleOutputCodeClick}
              disabled={
                this.state.niqqud && this.state.inputCode === 'estrangela'
              }
              active={this.state.outputCode === 'estrangela'}
              title="Estrangela ASCII code"
            >
              Estrangela
            </Button>
            <Button
              color="light"
              data-code="syriac"
              onClick={this.handleOutputCodeClick}
              disabled={this.state.niqqud && this.state.inputCode === 'syriac'}
              active={this.state.outputCode === 'syriac'}
              title="Syriac Unicode"
            >
              Syriac
            </Button>
            <Button
              color="light"
              data-code="hebrew"
              onClick={this.handleOutputCodeClick}
              disabled={this.state.niqqud && this.state.inputCode === 'hebrew'}
              active={this.state.outputCode === 'hebrew'}
              title="Hebrew Unicode"
            >
              Hebrew
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="arabic"
              onClick={this.handleOutputCodeClick}
              disabled={this.state.niqqud && this.state.inputCode === 'arabic'}
              active={this.state.outputCode === 'arabic'}
              title="Arabic Unicode"
            >
              Arabic
            </Button>
            <Button
              color="light"
              data-code="cal"
              onClick={this.handleOutputCodeClick}
              disabled={this.state.niqqud && this.state.inputCode === 'cal'}
              active={this.state.outputCode === 'cal'}
              title="CAL ASCII Code"
            >
              CAL Code
            </Button>
            <Button
              color="light"
              data-code="sedra"
              onClick={this.handleOutputCodeClick}
              disabled={this.state.niqqud && this.state.inputCode === 'sedra'}
              active={this.state.outputCode === 'sedra'}
              title="Sedra ASCII Code"
            >
              Sedra
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              onClick={this.handleNiqqudClick}
              active={this.state.niqqud}
              title="Include vowels and diacritics"
            >
              Niqqud
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup style={{ textAlign: 'center' }}>
          <Button color="primary" onClick={this.handleConvert}>
            Convert
          </Button>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            rows="3"
            readOnly
            title="Converted text"
            className={this.getClassByCode(this.state.outputCode)}
            value={this.state.output}
          />
        </FormGroup>
      </Container>
    );
  }
}
