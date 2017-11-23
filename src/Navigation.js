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
  DropdownMenu
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
              <NavLink tag={Link} to="/">Peshitta</NavLink>
            </NavItem>
            <Dropdown
              isOpen={this.state.dataDropdownOpen}
              toggle={this.toggleData}
            >
              <DropdownToggle nav caret>
                Lexicon
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink tag={Link} to="/root">Root</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/lexeme">Lexeme</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/word">Word</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/english">English</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/etymology">Etymology</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              isOpen={this.state.convertDropdownOpen}
              toggle={this.toggleConvert}
            >
              <DropdownToggle nav caret>
                Convert
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink tag={Link} to="/text">Text</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink tag={Link} to="/number">Number</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink tag={Link} to="/settings">Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
