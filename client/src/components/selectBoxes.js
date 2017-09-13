import React, { Component } from 'react'
import { Button, ToggleButtonGroup, ButtonToolbar, ToggleButton } from 'react-bootstrap';
import _ from 'lodash';
import tokyoValues from '../lib/tokyo/tokyoValues';

class SelectBoxes extends Component {

	constructor(){
		super();

		this.state = {
			placesToSearch: '',
			tokyoPresets: tokyoValues
		}
	}

	renderTokyo() {
		var tempTokyo = this.alphabetize(this.state.tokyoPresets);
		tempTokyo = tempTokyo.map((place) => {
			return(
		    	<ToggleButton onChange={e => this.handleClick(e)} value={place.code} key={place.code}>
		    		{place.city}
		        </ToggleButton>
			);
		});
		return tempTokyo;
	}

	alphabetize(val) {
		var sorted = _.sortBy(val, 'city');
		return sorted;
	}

	handleClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		let checkedValue = e.target.value;
		console.log(checkedValue);
	}


	render(){
		return(
			<div className="spaceTop">
				<h3>Search by City Location</h3>
				<div className="formatInner">
					<ButtonToolbar>
						<ToggleButtonGroup type="checkbox">
							{this.renderTokyo()}
						</ToggleButtonGroup>
					</ButtonToolbar>
				</div>
				<Button className="spaceTop" type="submit">
					Submit
			    </Button>
		    </div>
		);
	}
}

export default SelectBoxes;