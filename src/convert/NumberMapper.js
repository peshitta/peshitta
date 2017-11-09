import React from 'react';
import AramaicNumber from 'aramaic-number';
import {
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';
import { toCal as estrangelaToCal } from 'estrangela-cal';
import { toCal as arabicToCal } from 'arabic-cal';
import { toCal as sedraToCal } from 'sedra-cal';
import { toEstrangela } from 'cal-estrangela';
import { toArabic } from 'cal-arabic';
import { toSedra } from 'cal-sedra';

const nonNumeric = /[^0-9]+/gi;

export default class NumberMapper extends React.Component {
  state = {
    input: '',
    output: '',
    numeric: true,
    positional: true,
    code: 'estrangela'
  };

  handleNumericClick = () => {
    this.setState(prevState => ({
      numeric: !prevState.numeric,
      input: '',
      output: ''
    }));
  };

  handlePositionalClick = () => {
    this.setState(prevState => ({ positional: !prevState.positional }));
  };

  handleCodeClick = event => {
    this.setState({ code: event.target.id, output: '' });
  };

  handleInputChange = event => {
    let val = event.target.value.trim();
    this.setState(prevState => {
      if (prevState.numeric) {
        val = val.replace(nonNumeric, '');
      }
      return { input: val };
    });
  };

  handleConvert = () => {
    this.setState(prevState => {
      let val = prevState.input;
      if (!val) {
        return { output: '' };
      }
      if (prevState.numeric) {
        val = Number.parseInt(val, 10);
      } else {
        switch (prevState.code) {
          case 'estrangela':
            val = estrangelaToCal(val);
            break;
          case 'arabic':
            val = arabicToCal(val);
            break;
          case 'sedra':
            val = sedraToCal(val);
            break;
          default:
            break;
        }
      }

      const converter =
        prevState.code === 'hebrew' || prevState.code === 'syriac'
          ? new AramaicNumber(prevState.code)
          : new AramaicNumber('cal');
      let convertedVal =
        prevState.numeric || prevState.positional
          ? converter.getNumber(val)
          : converter.getNumber(val, true);

      if (prevState.numeric) {
        switch (prevState.code) {
          case 'estrangela':
            convertedVal = toEstrangela(convertedVal);
            break;
          case 'arabic':
            convertedVal = toArabic(convertedVal);
            break;
          case 'sedra':
            convertedVal = toSedra(convertedVal);
            break;
          default:
            break;
        }
      }
      return { output: convertedVal };
    });
  };

  getInputClass() {
    return this.state.numeric ? '' : this.getClassByCode();
  }

  getOutputClass() {
    return this.state.numeric ? this.getClassByCode() : '';
  }

  getClassByCode() {
    switch (this.state.code) {
      case 'estrangela':
      case 'syriac':
        return this.state.code;
      case 'hebrew':
      case 'arabic':
        return 'semitic';
      default:
        return '';
    }
  }

  componentDidMount() {
    this.numberButton.style.width = this.positionalButton.style.width = this.syriacButton.style.width = this.hebrewButton.style.width = this.arabicButton.style.width = this.calButton.style.width = this.sedraButton.style.width =
      this.estrangelaButton.offsetWidth + 'px';
  }

  initCap(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  render() {
    return (
      <Container>
        <FormGroup>
          <Label>
            <span>
              {this.state.numeric
                ? 'Number'
                : this.initCap(this.state.code) + ' letters'}
            </span>{' '}
            to{' '}
            <span>
              {this.state.numeric
                ? this.initCap(this.state.code) + ' letters'
                : 'Number'}
            </span>
          </Label>
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button
              id="estrangela"
              color="light"
              onClick={this.handleCodeClick}
              active={this.state.code === 'estrangela'}
              title="Estrangela ASCII code"
              innerRef={button => (this.estrangelaButton = button)}
            >
              Estrangela
            </Button>
            <Button
              id="syriac"
              color="light"
              onClick={this.handleCodeClick}
              active={this.state.code === 'syriac'}
              title="Syriac Unicode"
              innerRef={button => (this.syriacButton = button)}
            >
              Syriac
            </Button>
            <Button
              id="hebrew"
              color="light"
              onClick={this.handleCodeClick}
              active={this.state.code === 'hebrew'}
              title="Hebrew Unicode"
              innerRef={button => (this.hebrewButton = button)}
            >
              Hebrew
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              id="arabic"
              color="light"
              onClick={this.handleCodeClick}
              active={this.state.code === 'arabic'}
              title="Arabic Unicode"
              innerRef={button => (this.arabicButton = button)}
            >
              Arabic
            </Button>
            <Button
              id="cal"
              color="light"
              onClick={this.handleCodeClick}
              active={this.state.code === 'cal'}
              title="CAL ASCII Code"
              innerRef={button => (this.calButton = button)}
            >
              CAL Code
            </Button>
            <Button
              id="sedra"
              color="light"
              onClick={this.handleCodeClick}
              active={this.state.code === 'sedra'}
              title="Sedra ASCII Code"
              innerRef={button => (this.sedraButton = button)}
            >
              Sedra
            </Button>
          </ButtonGroup>
          &nbsp;
          <ButtonGroup>
            <Button
              color="light"
              onClick={this.handleNumericClick}
              active={this.state.numeric}
              title="Input is a number"
              innerRef={button => (this.numberButton = button)}
            >
              Number
            </Button>
            <Button
              color="light"
              onClick={this.handlePositionalClick}
              active={this.state.positional}
              disabled={this.state.numeric}
              title="Use letter position when computing number"
              innerRef={button => (this.positionalButton = button)}
            >
              Positional
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            rows="3"
            title={
              this.state.numeric ? 'Number to convert' : 'Letters to convert'
            }
            className={this.getInputClass()}
            onChange={this.handleInputChange}
            value={this.state.input}
          />
        </FormGroup>
        <FormGroup style={{ textAlign: 'center' }}>
          <Button color="primary" onClick={this.handleConvert}>
            {this.state.numeric ? 'To Letters' : 'To Number'}
          </Button>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            rows="3"
            readOnly
            title="Converted number"
            className={this.getOutputClass()}
            value={this.state.output}
          />
        </FormGroup>
      </Container>
    );
  }
}
