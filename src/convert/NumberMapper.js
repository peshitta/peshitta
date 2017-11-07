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
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      output: '',
      numeric: true,
      positional: true,
      code: 'estrangela'
    };

    this.onNumericClick = this.onNumericClick.bind(this);
    this.onPositionalClick = this.onPositionalClick.bind(this);
    this.onCodeClick = this.onCodeClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onNumericClick() {
    this.setState({ numeric: !this.state.numeric });
  }

  onPositionalClick() {
    this.setState({ positional: !this.state.positional });
  }

  onCodeClick(code) {
    this.setState({ code, output: '' });
  }

  onInputChange(event) {
    let val = event.target.value.trim();
    if (this.state.numeric) {
      val = val.replace(nonNumeric, '');
      event.target.value = val;
      val = Number.parseInt(val, 10);
    }
    this.setState({ input: val });
  }

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

  convert() {
    let val = this.state.input;
    if (!this.state.numeric) {
      switch (this.state.code) {
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
      this.state.code === 'hebrew' || this.state.code === 'syriac'
        ? new AramaicNumber(this.state.code)
        : new AramaicNumber('cal');

    let convertedVal = converter.getNumber(val);
    if (this.state.numeric) {
      switch (this.state.code) {
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

    this.setState({ output: convertedVal });
  }

  render() {
    return (
      <Container>
        <FormGroup>
          <Label style={{ fontSize: 'larger' }}>
            Number to or from Aramaic letters
          </Label>
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button
              color="light"
              onClick={() => this.onNumericClick()}
              active={this.state.numeric}
              title="Input is a number"
            >
              Number
            </Button>
            <Button
              color="light"
              onClick={() => this.onPositionalClick()}
              active={this.state.positional}
              disabled={this.state.numeric}
              title="Use letter position when computing number"
            >
              Positional
            </Button>
          </ButtonGroup>
          &nbsp;
          <ButtonGroup>
            <Button
              color="light"
              onClick={() => this.onCodeClick('estrangela')}
              active={this.state.code === 'estrangela'}
              title="Estrangela ASCII code"
            >
              Estrangela
            </Button>
            <Button
              color="light"
              onClick={() => this.onCodeClick('syriac')}
              active={this.state.code === 'syriac'}
              title="Syriac Unicode"
            >
              Syriac
            </Button>
            <Button
              color="light"
              onClick={() => this.onCodeClick('hebrew')}
              active={this.state.code === 'hebrew'}
              title="Hebrew Unicode"
            >
              Hebrew
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              onClick={() => this.onCodeClick('arabic')}
              active={this.state.code === 'arabic'}
              title="Arabic Unicode"
            >
              Arabic
            </Button>
            <Button
              color="light"
              onClick={() => this.onCodeClick('cal')}
              active={this.state.code === 'cal'}
              title="CAL ASCII Code"
            >
              CAL Code
            </Button>
            <Button
              color="light"
              onClick={() => this.onCodeClick('sedra')}
              active={this.state.code === 'sedra'}
              title="Sedra ASCII Code"
            >
              Sedra
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="number"
            id="number"
            rows="3"
            title={
              this.state.numeric ? 'Number to convert' : 'Letters to convert'
            }
            className={this.getInputClass()}
            onChange={this.onInputChange}
          />
        </FormGroup>
        <FormGroup style={{ textAlign: 'center' }}>
          <Button color="primary" onClick={event => this.convert(event)}>
            Convert
          </Button>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="convertedNumber"
            id="convertedNumber"
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
