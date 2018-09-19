<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Petpholio</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
      <Button bsSize="large">
        <Glyphicon glyph="home"/> Home
      </Button>
    </NavItem>
    <NavItem eventKey={2} href="#">
    <Button bsSize="large">
        <Glyphicon glyph="off"/> Log Off
      </Button>
    </NavItem>
    <NavDropdown eventKey={3} title="My Pets" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Add Pet</MenuItem>
      <MenuItem eventKey={3.2}>Delete Pet</MenuItem>
      <MenuItem eventKey={3.3}></MenuItem>
    </NavDropdown>
  </Nav>
</Navbar>;

