import React from 'react';
import {
  Container,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { initCap } from './util';

export default class Settings extends React.Component {
  state = {
    searchCode: 'cal',
    niqqud: true,
    transliteration: {
      ipa: true,
      latin: false,
      estrangela: false,
      syriac: false,
      hebrew: false,
      arabic: false,
      cal: false,
      sedra: false
    }
  };

  handleTransliterationClick = event => {
    const code = event.target.dataset['code'];
    this.setState(prevState => ({
      transliteration: Object.assign({}, prevState.transliteration, {
        [code]: !prevState.transliteration[code]
      })
    }));
  };

  handleNiqqudClick = () => {
    this.setState(prevState => ({
      niqqud: !prevState.niqqud
    }));
  };

  handleSearchCodeClick = event => {
    const searchCode = event.target.dataset['code'];
    this.setState({ searchCode });
  };

  componentDidMount() {
    this.niqqudButton.style.width = this.ipaTransliteration.style.width = this.latinTransliteration.style.width = this.syriacTransliteration.style.width = this.hebrewTransliteration.style.width = this.arabicTransliteration.style.width = this.calTransliteration.style.width = this.sedraTransliteration.style.width = this.syriacSearch.style.width = this.hebrewSearch.style.width = this.arabicSearch.style.width = this.calSearch.style.width = this.sedraSearch.style.width = this.estrangelaSearch.style.width =
      this.estrangelaTransliteration.offsetWidth + 'px';
  }

  render() {
    return (
      <Container>
        <FormGroup>
          <Label for="viewSelect">Peshitta View</Label>
          <Input type="select" id="viewSelect">
            <option value="eastern">Eastern Peshitta</option>
            <option value="western">Western Peshitta</option>
            <option value="ubs">UBS Peshitta</option>
          </Input>
        </FormGroup>
        <Label>Transliteration</Label>
        <FormGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="ipa"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.ipa}
              title="IPA Unicode"
              innerRef={button => (this.ipaTransliteration = button)}
            >
              IPA code
            </Button>
            <Button
              color="light"
              data-code="latin"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.latin}
              title="Latin Unicode"
              innerRef={button => (this.latinTransliteration = button)}
            >
              Latin
            </Button>
            <Button
              color="light"
              data-code="estrangela"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.estrangela}
              title="Estrangela ASCII code"
              innerRef={button => (this.estrangelaTransliteration = button)}
            >
              Estrangela
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="syriac"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.syriac}
              title="Syriac Unicode"
              innerRef={button => (this.syriacTransliteration = button)}
            >
              Syriac
            </Button>
            <Button
              color="light"
              data-code="hebrew"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.hebrew}
              title="Hebrew Unicode"
              innerRef={button => (this.hebrewTransliteration = button)}
            >
              Hebrew
            </Button>
            <Button
              color="light"
              data-code="arabic"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.arabic}
              title="Arabic Unicode"
              innerRef={button => (this.arabicTransliteration = button)}
            >
              Arabic
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              data-code="cal"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.cal}
              title="CAL ASCII Code"
              innerRef={button => (this.calTransliteration = button)}
            >
              CAL Code
            </Button>
            <Button
              color="light"
              data-code="sedra"
              onClick={this.handleTransliterationClick}
              active={this.state.transliteration.sedra}
              title="Sedra ASCII Code"
              innerRef={button => (this.sedraTransliteration = button)}
            >
              Sedra
            </Button>
            <Button
              color="light"
              onClick={this.handleNiqqudClick}
              active={this.state.niqqud}
              disabled={
                !this.state.transliteration.syriac &&
                !this.state.transliteration.hebrew &&
                !this.state.transliteration.arabic &&
                !this.state.transliteration.cal &&
                !this.state.transliteration.sedra
              }
              title="Include vowels and diacritics"
              innerRef={button => (this.niqqudButton = button)}
            >
              Niqqud
            </Button>
          </ButtonGroup>
        </FormGroup>
        <Label>{initCap(this.state.searchCode)} Search Input</Label>
        <FormGroup>
          <ButtonGroup>
            <Button
              id="cal"
              color="light"
              data-code="cal"
              onClick={this.handleSearchCodeClick}
              active={this.state.searchCode === 'cal'}
              title="CAL ASCII Code"
              innerRef={button => (this.calSearch = button)}
            >
              CAL Code
            </Button>
            <Button
              id="estrangela"
              color="light"
              data-code="estrangela"
              onClick={this.handleSearchCodeClick}
              active={this.state.searchCode === 'estrangela'}
              title="Estrangela ASCII code"
              innerRef={button => (this.estrangelaSearch = button)}
            >
              Estrangela
            </Button>
            <Button
              id="sedra"
              color="light"
              data-code="sedra"
              onClick={this.handleSearchCodeClick}
              active={this.state.searchCode === 'sedra'}
              title="Sedra ASCII Code"
              innerRef={button => (this.sedraSearch = button)}
            >
              Sedra
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              id="syriac"
              color="light"
              data-code="syriac"
              onClick={this.handleSearchCodeClick}
              active={this.state.searchCode === 'syriac'}
              title="Syriac Unicode"
              innerRef={button => (this.syriacSearch = button)}
            >
              Syriac
            </Button>
            <Button
              id="hebrew"
              color="light"
              onClick={this.handleSearchCodeClick}
              data-code="hebrew"
              active={this.state.searchCode === 'hebrew'}
              title="Hebrew Unicode"
              innerRef={button => (this.hebrewSearch = button)}
            >
              Hebrew
            </Button>
            <Button
              id="arabic"
              color="light"
              data-code="arabic"
              onClick={this.handleSearchCodeClick}
              active={this.state.searchCode === 'arabic'}
              title="Arabic Unicode"
              innerRef={button => (this.arabicSearch = button)}
            >
              Arabic
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Button color="primary">Refresh Application</Button>
        </FormGroup>
      </Container>
    );
  }
}
