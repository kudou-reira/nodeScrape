import React, { Component } from 'react';
import GoogleMap from './googleMap';
import SelectBoxes from './selectBoxes';
import { connect } from 'react-redux';

class Searching extends Component {

	render(){
		return(
			<div>
				<h2 className="spaceTop spaceBottom">Search Tokyo for Apartments</h2>
				{this.props.auth == null 
	            	? <h3 className="spaceTop spaceBottom" id="header">Login with the top right toolbar to save searches</h3>
		            : null
			    }
				<GoogleMap />
				<SelectBoxes />
			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
		auth: state.auth
	};
}

export default connect(mapStateToProps, null)(Searching);