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
import { initCap } from '../util';

const nonNumberRegExp = /[^0-9]+/g;
const estrangelaNonNumberRegExp = /[^0bgdhwzx=yklmns9pcqr4tfFBGX+YKLMNS(PQ$<J]+/g;
const syriacNonNumberRegExp = /[^ܐܒܓܕܗܘܙܚܛܝܟܠܡܢܣܥܦܨܩܪܫܬ]+/;
const hebrewNonNumberRegExp = /[^'"אבגדהוזחטיכלמנסעפצקרשת״׳]+/g;
const arabicNonNumberRegExp = /[^ابجدهوزحطيكلمنسعفصقرشت]+/g;
const calNonNumberRegExp = /[^)bgdhwzxTyklmns(pcqr$t]+/g;
const sedraNonNumberRegExp = /[^ABGDHOZKY;CLMNSEI/XRWT]+/g;

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
    this.inputElement.focus();
  };

  handlePositionalClick = () => {
    this.setState(prevState => ({ positional: !prevState.positional }));
    this.inputElement.focus();
  };

  handleCodeClick = event => {
    this.setState({ code: event.target.id }, () => {
      if (this.state.numeric) {
        this.handleConvert();
      } else {
        this.setState({ input: '', output: '' });
      }
      this.inputElement.focus();
    });
  };

  handleInputChange = event => {
    let val = event.target.value.trim();
    this.setState(prevState => {
      let input = val;
      if (prevState.numeric) {
        input = val.replace(nonNumberRegExp, '');
        return { input };
      }
      switch (prevState.code) {
        case 'estrangela':
          input = val.replace(estrangelaNonNumberRegExp, '');
          break;
        case 'syriac':
          input = val.replace(syriacNonNumberRegExp, '');
          break;
        case 'hebrew':
          input = val.replace(hebrewNonNumberRegExp, '');
          break;
        case 'arabic':
          input = val.replace(arabicNonNumberRegExp, '');
          break;
        case 'cal':
          input = val.replace(calNonNumberRegExp, '');
          break;
        case 'sedra':
          input = val.replace(sedraNonNumberRegExp, '');
          break;
        default:
          break;
      }
      return { input };
    });
  };

  handleInputKeyPress = event => {
    if (event.charCode === 13) {
      this.handleConvert();
    }
  };

  handleConvert = () => {
    this.setState(prevState => {
      let val = prevState.input;
      if (!val) {
        this.inputElement.focus();
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
      this.outputElement.focus();
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

  render() {
    return (
      <Container>
        <FormGroup>
          <Label>
            <span>
              {this.state.numeric
                ? 'Number'
                : initCap(this.state.code) + ' letters'}
            </span>{' '}
            to{' '}
            <span>
              {this.state.numeric
                ? initCap(this.state.code) + ' letters'
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
            type="input"
            style={{ textAlign: 'center' }}
            title={
              this.state.numeric ? 'Number to convert' : 'Letters to convert'
            }
            className={this.getInputClass()}
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeyPress}
            value={this.state.input}
            innerRef={input => (this.inputElement = input)}
          />
        </FormGroup>
        <FormGroup style={{ textAlign: 'center' }}>
          <Button color="primary" onClick={this.handleConvert}>
            {this.state.numeric ? 'To Letters' : 'To Number'}
          </Button>
        </FormGroup>
        <FormGroup>
          <Input
            type="input"
            style={{ textAlign: 'center' }}
            readOnly
            title="Converted number"
            className={this.getOutputClass()}
            value={this.state.output}
            innerRef={input => (this.outputElement = input)}
          />
        </FormGroup>
      </Container>
    );
  }
}
