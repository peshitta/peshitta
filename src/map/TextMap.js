import React from 'react';
import {
  Button,
  ButtonGroup,
  FormGroup,
  Input,
  Label,
  Container
} from 'reactstrap';
import { AutoSizer } from 'react-virtualized';
import Expander from '../Expander';

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

export default class MapText extends React.PureComponent {
  state = {
    input: '',
    output: '',
    niqqud: true,
    inputCode: 'estrangela',
    outputCode: 'ipa'
  };

  handleInputCodeClick = event => {
    const inputCode = event.target.dataset['code'];
    this.setState(prevState => {
      const outputCode =
        prevState.niqqud && inputCode === prevState.outputCode
          ? 'ipa'
          : prevState.outputCode;
      return { inputCode, outputCode, input: '', output: '' };
    });
    this.inputElement.focus();
  };

  handleSourceChange = event => {
    this.setState({ input: event.target.value });
  };

  handleOutputCodeClick = event => {
    const outputCode = event.target.dataset['code'];
    this.setState({ outputCode }, () => {
      this.handleConvert();
    });
  };

  handleNiqqudClick = () => {
    this.setState(
      prevState => {
        const niqqud = !prevState.niqqud;
        const outputCode =
          niqqud && prevState.inputCode === prevState.outputCode
            ? 'ipa'
            : prevState.outputCode;
        return { niqqud, outputCode, output: '' };
      },
      () => {
        this.handleConvert();
      }
    );
  };

  handleConvert = () => {
    this.setState(prevState => {
      const inputCode = prevState.inputCode;
      const outputCode = prevState.outputCode;
      const text = prevState.input;
      const clearDotting =
        !prevState.niqqud && outputCode !== 'ipa' && outputCode !== 'latin';
      let output = '';
      if (!text) {
        this.inputElement.focus();
        return { output };
      }

      switch (inputCode) {
        case 'estrangela':
          output = clearDotting ? estrangelaRemoveDotting(text) : text;
          output =  output.replace('f', 'l0').replace('F', 't0');
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
      this.outputElement.focus();
      return { output };
    });
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

  selectInput = () => {
    const input = this.inputElement;
    input && input.value && input.setSelectionRange(0, input.value.length);
  }

  copyOutput = () => {
    const output = this.outputElement;
    output && output.value && output.setSelectionRange(0, output.value.length);
    document.execCommand('copy');
  }

  componentDidMount() {
    this.niqqudButton.style.width = this.ipaButton.style.width = this.latinButton.style.width = this.syriacInputButton.style.width = this.hebrewInputButton.style.width = this.arabicInputButton.style.width = this.calInputButton.style.width = this.sedraInputButton.style.width = this.syriacOutputButton.style.width = this.hebrewOutputButton.style.width = this.arabicOutputButton.style.width = this.calOutputButton.style.width = this.sedraOutputButton.style.width = this.estrangelaOutputButton.style.width =
      this.estrangelaInputButton.offsetWidth + 'px';
  }

  render() {
    return (
      <Expander>
        <AutoSizer disableWidth>
          {({ height }) => (
            <Container style={{ height, overflow: 'auto' }}>
              <FormGroup>
                <Label>
                  <span className="text-capitalize">
                    {this.state.inputCode}
                  </span>{' '}
                  to{' '}
                  <span className="text-capitalize">
                    {this.state.outputCode}
                  </span>{' '}
                  {this.state.niqqud ||
                  this.state.outputCode === 'ipa' ||
                  this.state.outputCode === 'latin'
                    ? ''
                    : 'consonant'}{' '}
                  text
                </Label>
              </FormGroup>
              <FormGroup>
                <ButtonGroup>
                  <Button
                    color="light"
                    data-code="estrangela"
                    onClick={this.handleInputCodeClick}
                    active={this.state.inputCode === 'estrangela'}
                    title="Estrangela ASCII code"
                    innerRef={button => (this.estrangelaInputButton = button)}
                  >
                    Estrangela
                  </Button>
                  <Button
                    color="light"
                    data-code="syriac"
                    onClick={this.handleInputCodeClick}
                    active={this.state.inputCode === 'syriac'}
                    title="Syriac Unicode"
                    innerRef={button => (this.syriacInputButton = button)}
                  >
                    Syriac
                  </Button>
                  <Button
                    color="light"
                    data-code="hebrew"
                    onClick={this.handleInputCodeClick}
                    active={this.state.inputCode === 'hebrew'}
                    title="Hebrew Unicode"
                    innerRef={button => (this.hebrewInputButton = button)}
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
                    innerRef={button => (this.arabicInputButton = button)}
                  >
                    Arabic
                  </Button>
                  <Button
                    color="light"
                    data-code="cal"
                    onClick={this.handleInputCodeClick}
                    active={this.state.inputCode === 'cal'}
                    title="CAL ASCII Code"
                    innerRef={button => (this.calInputButton = button)}
                  >
                    CAL Code
                  </Button>
                  <Button
                    color="light"
                    data-code="sedra"
                    onClick={this.handleInputCodeClick}
                    active={this.state.inputCode === 'sedra'}
                    title="Sedra ASCII Code"
                    innerRef={button => (this.sedraInputButton = button)}
                  >
                    Sedra
                  </Button>
                </ButtonGroup>
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  innerRef={input => (this.inputElement = input)}
                  rows="3"
                  title="Source text"
                  className={this.getClassByCode(this.state.inputCode)}
                  onChange={this.handleSourceChange}
                  onFocus={this.selectInput}
                  value={this.state.input}
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
                    innerRef={button => (this.ipaButton = button)}
                  >
                    IPA code
                  </Button>
                  <Button
                    color="light"
                    data-code="latin"
                    onClick={this.handleOutputCodeClick}
                    active={this.state.outputCode === 'latin'}
                    title="Latin Unicode"
                    innerRef={button => (this.latinButton = button)}
                  >
                    Latin
                  </Button>
                  <Button
                    color="light"
                    onClick={this.handleNiqqudClick}
                    active={this.state.niqqud}
                    title="Include vowels and diacritics"
                    innerRef={button => (this.niqqudButton = button)}
                  >
                    Niqqud
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
                    innerRef={button => (this.estrangelaOutputButton = button)}
                  >
                    Estrangela
                  </Button>
                  <Button
                    color="light"
                    data-code="syriac"
                    onClick={this.handleOutputCodeClick}
                    disabled={
                      this.state.niqqud && this.state.inputCode === 'syriac'
                    }
                    active={this.state.outputCode === 'syriac'}
                    title="Syriac Unicode"
                    innerRef={button => (this.syriacOutputButton = button)}
                  >
                    Syriac
                  </Button>
                  <Button
                    color="light"
                    data-code="hebrew"
                    onClick={this.handleOutputCodeClick}
                    disabled={
                      this.state.niqqud && this.state.inputCode === 'hebrew'
                    }
                    active={this.state.outputCode === 'hebrew'}
                    title="Hebrew Unicode"
                    innerRef={button => (this.hebrewOutputButton = button)}
                  >
                    Hebrew
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    color="light"
                    data-code="arabic"
                    onClick={this.handleOutputCodeClick}
                    disabled={
                      this.state.niqqud && this.state.inputCode === 'arabic'
                    }
                    active={this.state.outputCode === 'arabic'}
                    title="Arabic Unicode"
                    innerRef={button => (this.arabicOutputButton = button)}
                  >
                    Arabic
                  </Button>
                  <Button
                    color="light"
                    data-code="cal"
                    onClick={this.handleOutputCodeClick}
                    disabled={
                      this.state.niqqud && this.state.inputCode === 'cal'
                    }
                    active={this.state.outputCode === 'cal'}
                    title="CAL ASCII Code"
                    innerRef={button => (this.calOutputButton = button)}
                  >
                    CAL Code
                  </Button>
                  <Button
                    color="light"
                    data-code="sedra"
                    onClick={this.handleOutputCodeClick}
                    disabled={
                      this.state.niqqud && this.state.inputCode === 'sedra'
                    }
                    active={this.state.outputCode === 'sedra'}
                    title="Sedra ASCII Code"
                    innerRef={button => (this.sedraOutputButton = button)}
                  >
                    Sedra
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
                  innerRef={input => (this.outputElement = input)}
                  rows="3"
                  readOnly
                  title="Converted text"
                  className={this.getClassByCode(this.state.outputCode)}
                  value={this.state.output}
                  onDoubleClick={this.copyOutput}
                />
              </FormGroup>
            </Container>
          )}
        </AutoSizer>
      </Expander>
    );
  }
}
