import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import logo from './logo.jpg';

export default class Navigation extends React.PureComponent {
  state = {
    navbarCollapsed: true,
    convertDropdownOpen: false,
    dataDropdownOpen: false
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      navbarCollapsed: !prevState.navbarCollapsed
    }));
  };

  toggleConvert = () => {
    this.setState(prevState => ({
      convertDropdownOpen: !prevState.convertDropdownOpen
    }));
  };

  toggleData = () => {
    this.setState(prevState => ({
      dataDropdownOpen: !prevState.dataDropdownOpen
    }));
  };

  render() {
    return (
      <Navbar color="faded" light expand="md">
        <NavbarBrand tag={Link} to="/">
          <img src={logo} className="App-logo" alt="Peshitta Logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.navbarCollapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                <i className="fa fa-book" aria-hidden="true" title="Peshitta" />{' '}
                Peshitta
              </NavLink>
            </NavItem>
            <Dropdown
              isOpen={this.state.dataDropdownOpen}
              toggle={this.toggleData}
            >
              <DropdownToggle nav caret>
                <i className="fa fa-table" aria-hidden="true" title="Lexicon" />{' '}
                Lexicon
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink tag={Link} to="/root">
                    <i
                      className="fa fa-heart-o"
                      aria-hidden="true"
                      title="Root"
                    />{' '}
                    Root
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/lexeme">
                    <i
                      className="fa fa-circle-thin"
                      aria-hidden="true"
                      title="Lexeme"
                    />{' '}
                    Lexeme
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/word">
                    <i className="fa fa-leaf" aria-hidden="true" title="Word" />{' '}
                    Word
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/english">
                    <i
                      className="fa fa-sticky-note-o"
                      aria-hidden="true"
                      title="English"
                    />{' '}
                    English
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/etymology">
                    <i
                      className="fa fa-object-group"
                      aria-hidden="true"
                      title="Etymology"
                    />{' '}
                    Etymology
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              isOpen={this.state.convertDropdownOpen}
              toggle={this.toggleConvert}
            >
              <DropdownToggle nav caret>
                <i className="fa fa-clone" aria-hidden="true" title="Convert" />{' '}
                Convert
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink tag={Link} to="/text">
                    <i
                      className="fa fa-language"
                      aria-hidden="true"
                      title="Text"
                    />{' '}
                    Text
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink tag={Link} to="/number">
                    <i
                      className="fa fa-hashtag"
                      aria-hidden="true"
                      title="Number"
                    />{' '}
                    Number
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink tag={Link} to="/settings">
                <i className="fa fa-cog fa-fw" title="Settings" /> Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">
                <i
                  className="fa fa-info-circle"
                  aria-hidden="true"
                  title="About"
                />{' '}
                About
              </NavLink>
            </NavItem>
            <div className="form-inline">
              <FormGroup>
                <Label for="search" hidden>
                  Search
                </Label>
                <Input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  id="search"
                  spellCheck="false"
                  autoCorrect="off"
                />{' '}
                <Button outline color="success">
                  <i
                    className="fa fa-search"
                    aria-hidden="true"
                    title="Search"
                  />
                </Button>
              </FormGroup>
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
