import React, { Component } from 'react';
import GoogleMap from './googleMap';
import SelectBoxes from './selectBoxes';

class Searching extends Component {

	render(){
		return(
			<div>
				<h2>Search Japan for Apartments</h2>
				<GoogleMap />
				<SelectBoxes />
			</div>
		);
	}
}

export default Searching;