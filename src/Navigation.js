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
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleMap() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="#/">
            <img src={logo} className="App-logo" alt="Peshitta Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#/">Peshitta</NavLink>
              </NavItem>
              <NavDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleMap}
              >
                <DropdownToggle nav caret>
                  Map
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
                <NavLink href="#/about">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
