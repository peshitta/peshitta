import React from 'react';
import {
  Container,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap';
import { AutoSizer } from 'react-virtualized';
import Expander from './Expander';

export default class Settings extends React.PureComponent {
  state = {
    version: 'ubs',
    filter: 'none',
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

  handleVersionChange = event => {
    const version = event.target.value;
    this.setState(prevState => {
      let filter = prevState.filter;
      if (
        version === 'eastern' &&
        (filter === 'western' ||
          filter === '2pet' ||
          filter === '2jn' ||
          filter === '3jn' ||
          filter === 'jude' ||
          filter === 'rev')
      ) {
        filter = 'none';
      }
      return { version, filter };
    });
  };

  handleFilterChange = event => {
    const filter = event.target.value;
    this.setState({ filter });
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
      <Expander>
        <AutoSizer disableWidth>
          {({ height }) => (
            <Container style={{ height, overflow: 'auto' }}>
              <FormGroup title="Select Peshitta version to use">
                <Label for="versionSelect">Peshitta Version</Label>
                <Input
                  type="select"
                  id="versionSelect"
                  value={this.state.version}
                  onChange={this.handleVersionChange}
                >
                  <option value="ubs">UBS Peshitta</option>
                  <option value="eastern" disabled>
                    Eastern Peshitta
                  </option>
                  <option value="western" disabled>
                    Western Peshitta
                  </option>
                  <option value="khaboris" disabled>
                    Khaboris Codex
                  </option>
                </Input>
              </FormGroup>
              <FormGroup title="Display only a subset of Peshitta books">
                <Label for="filterSelect">Apply Filter</Label>
                <Input
                  type="select"
                  id="filterSelect"
                  onChange={this.handleFilterChange}
                  value={this.state.filter}
                >
                  <option value="none">None</option>
                  <optgroup label="Gospels">
                    <option value="gospels">All Gospels</option>
                    <option value="mt">Matthew</option>
                    <option value="mk">Mark</option>
                    <option value="lk">Luke</option>
                    <option value="jn">John</option>
                  </optgroup>
                  <optgroup label="General">
                    <option value="general">All General</option>
                    <option value="acts">Acts of the Apostles</option>
                    <option value="jas">James</option>
                    <option value="1pet">1 Peter</option>
                    <option value="1jn">1 John</option>
                  </optgroup>
                  <optgroup label="Paulines">
                    <option value="paulines">All Paulines</option>
                    <option value="rom">Romans</option>
                    <option value="1cor">1 Corinthians</option>
                    <option value="2cor">2 Corinthians</option>
                    <option value="gal">Galatians</option>
                    <option value="eph">Ephesians</option>
                    <option value="phil">Philippians</option>
                    <option value="col">Colossians</option>
                    <option value="1thes">1 Thessalonians</option>
                    <option value="2thes">2 Thessalonians</option>
                    <option value="1tim">1 Timothy</option>
                    <option value="2tim">2 Timothy</option>
                    <option value="tit">Titus</option>
                    <option value="philem">Philemon</option>
                    <option value="heb">Hebrews</option>
                  </optgroup>
                  <optgroup
                    label="Western"
                    disabled={this.state.version === 'eastern'}
                  >
                    <option value="western">All Western</option>
                    <option value="2pet">2 Peter</option>
                    <option value="2jn">2 John</option>
                    <option value="3jn">3 John</option>
                    <option value="jude">Jude</option>
                    <option value="rev">Revelation</option>
                  </optgroup>
                </Input>
              </FormGroup>
              <Label title="Display selected transliterations or none if no selection">
                Transliteration
              </Label>
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
                    innerRef={button =>
                      (this.estrangelaTransliteration = button)
                    }
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
              <Label title="Font to use for search inputs">
                Using{' '}
                <span className="text-capitalize">{this.state.searchCode}</span>{' '}
                for Search Input
              </Label>
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
              <Row>
                <Col>
                  <Button
                    title="Clear cached computed data to release memory"
                    color="warning"
                    onClick={() => {}}
                  >
                    <i
                      className="fa fa-times"
                      aria-hidden="true"
                      title="Clear Cached"
                    />{' '}
                    Clear Cached
                  </Button>
                </Col>
                <Col>
                  <Button
                    title="Get latest content from server"
                    color="warning"
                    onClick={() => {
                      window.location.reload(true);
                    }}
                  >
                    <i
                      className="fa fa-repeat"
                      aria-hidden="true"
                      title="Upgrade"
                    />{' '}
                    Upgrade
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </AutoSizer>
      </Expander>
    );
  }
}
