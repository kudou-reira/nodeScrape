import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FaGoogle from 'react-icons/lib/fa/google';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';

class Header extends Component {

	renderContent(){
		switch(this.props.auth) {
			case null:
				return;
			case false:
				return(
					<Nav pullRight>
						<NavItem href="/auth/google">
							<div style={{color: 'white'}}>
								<FaGoogle size={20} />
							</div>
						</NavItem>
				        <NavItem href="/auth/facebook">
				        	<div style={{color: 'white'}}>
								<FaFacebook size={20} />
							</div>
				        </NavItem>
				        <NavItem href="/auth/twitter">
				        	<div style={{color: 'white'}}>
								<FaTwitter size={20} />
							</div>
				        </NavItem>
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