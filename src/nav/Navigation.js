import React from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import GoTo from './GoTo';
import logo from './logo.jpg';

export default class Navigation extends React.PureComponent {
  state = {
    navbarCollapsed: true,
    lexiconDropdownOpen: false,
    convertDropdownOpen: false,
    settingsDropdownOpen: false
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      navbarCollapsed: !prevState.navbarCollapsed
    }));
  };

  toggleLexicon = () => {
    this.setState(prevState => ({
      lexiconDropdownOpen: !prevState.lexiconDropdownOpen
    }));
  };

  toggleConvert = () => {
    this.setState(prevState => ({
      convertDropdownOpen: !prevState.convertDropdownOpen
    }));
  };

  toggleSettings = () => {
    this.setState(prevState => ({
      settingsDropdownOpen: !prevState.settingsDropdownOpen
    }));
  };

  render() {
    return (
      <Navbar color="faded" light expand="md">
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} className="App-logo" to="/">
              <img src={logo} alt="Peshitta Logo" title="Peshitta" />
            </NavLink>
          </NavItem>
          <GoTo />
          <NavbarToggler onClick={this.toggleNavbar} />
        </Nav>
        <Collapse
          isOpen={this.state.navbarCollapsed}
          navbar
          style={{ minWidth: '270px' }}
        >
          <Nav navbar>
            <Dropdown
              isOpen={this.state.lexiconDropdownOpen}
              toggle={this.toggleLexicon}
            >
              <DropdownToggle nav caret>
                <i className="fa fa-table" aria-hidden="true" title="Lexicon" />{' '}
                Lexicon
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink tag={RouterNavLink} to="/root">
                    <i
                      className="fa fa-heart-o"
                      aria-hidden="true"
                      title="Root"
                    />{' '}
                    Root
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={RouterNavLink} to="/lexeme">
                    <i
                      className="fa fa-circle-thin"
                      aria-hidden="true"
                      title="Lexeme"
                    />{' '}
                    Lexeme
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={RouterNavLink} to="/word">
                    <i className="fa fa-leaf" aria-hidden="true" title="Word" />{' '}
                    Word
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={RouterNavLink} to="/english">
                    <i
                      className="fa fa-sticky-note-o"
                      aria-hidden="true"
                      title="English"
                    />{' '}
                    English
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={RouterNavLink} to="/etymology">
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
                  <NavLink tag={RouterNavLink} to="/text">
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
                  <NavLink tag={RouterNavLink} to="/number">
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
            <Dropdown
              isOpen={this.state.settingsDropdownOpen}
              toggle={this.toggleSettings}
            >
              <DropdownToggle nav caret>
                <i
                  className="fa fa-sliders"
                  aria-hidden="true"
                  title="Settings &amp; Help"
                />{' '}
                Help
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={RouterNavLink} to="/settings">
                      <i className="fa fa-cog fa-fw" title="Settings" />{' '}
                      Settings
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={RouterNavLink} to="/help">
                      <i
                        className="fa fa-info-circle"
                        aria-hidden="true"
                        title="Help"
                      />{' '}
                      Help
                    </NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
