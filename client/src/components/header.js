import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {

	renderContent(){
		switch(this.props.auth) {
			case null:
				return;
			case false:
				return(
					<Nav pullRight>
						<NavItem href="/auth/google">Login with Google</NavItem>
				        <NavItem href="/auth/facebook">Login with Facebook</NavItem>
				        <NavItem href="/auth/twitter">Login with Twitter</NavItem>
			        </Nav>
				);
			default:
				return(
					<Nav pullRight>
						<NavItem href="/api/logout">Logout</NavItem>
					</Nav>
				);
		}
	}

	renderEmailSignup() {
		switch(this.props.auth) {
			case null:
				return;
			case false:
				return(
					<Nav>
						<NavItem eventKey={1} href="#">Link</NavItem>
				        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
				          <MenuItem eventKey={3.1}>Action</MenuItem>
				          <MenuItem eventKey={3.2}>Another action</MenuItem>
				          <MenuItem eventKey={3.3}>Something else here</MenuItem>
				          <MenuItem divider />
				          <MenuItem eventKey={3.3}>Separated link</MenuItem>
				        </NavDropdown>
				    </Nav>
				);
			default:
				return;
		}
	}


	render(){
		return(
			<Navbar inverse>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <Link to={this.props.auth ? '/saved-locations' : '/'}>
			        	{this.props.auth ? 'Saved Locations' : 'Rent in Japan'}
			        </Link>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      {this.renderEmailSignup()}
			      {this.renderContent()}
			    </Navbar.Collapse>
			 </Navbar>
		)
	}
}

function mapStateToProps(state){
	return { 
		auth: state.auth
	};
}

export default connect(mapStateToProps, null)(Header);