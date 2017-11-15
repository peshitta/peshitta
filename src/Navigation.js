import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import logo from './logo.jpg';

export default class Navigation extends React.Component {
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
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="#/">
            <img src={logo} className="App-logo" alt="Peshitta Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.navbarCollapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#/">Peshitta</NavLink>
              </NavItem>
              <NavDropdown
                isOpen={this.state.dataDropdownOpen}
                toggle={this.toggleData}
              >
                <DropdownToggle nav caret>
                  Lexicon
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink href="#/db/root">Root</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="#/db/lexeme">Lexeme</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="#/db/word">Word</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="#/db/english">English</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="#/db/etymology">Etymology</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </NavDropdown>
              <NavDropdown
                isOpen={this.state.convertDropdownOpen}
                toggle={this.toggleConvert}
              >
                <DropdownToggle nav caret>
                  Convert
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink href="#/map/text">Text</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink href="#/map/number">Number</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </NavDropdown>
              <NavItem>
                <NavLink href="#/settings">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/about">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
