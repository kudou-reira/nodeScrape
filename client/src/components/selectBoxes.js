import React, { Component } from 'react'
import { Button, ToggleButtonGroup, ButtonToolbar, ToggleButton } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

import tokyoValues from '../lib/tokyo/tokyoValues';
import roomSize from '../lib/roomParams/roomSize';
import { generateLowerLimits, generateHigherLimits } from '../lib/roomParams/limitPrices';
import { generateLowerRoomLimits, generateHigherRoomLimits } from '../lib/roomParams/limitSize';


class SelectBoxes extends Component {

	constructor(){
		super();

		this.state = {
			placesToSearch: [],
			tokyoPresets: tokyoValues,
			sizeToSearch: [],
			roomPresets: roomSize,
			lowPriceToSearch: 0,
			lowPricePresets: generateLowerLimits(),
			highPriceToSearch: 0,
			highPricePresets: generateHigherLimits(),
			lowRoomToSearch: 0,
			lowRoomPresets: generateLowerRoomLimits(),
			highRoomToSearch: 0,
			highRoomPresets: generateHigherRoomLimits(),
			priceError: false,
			areaError: false
		}
	}


	renderTokyo() {
		var tempTokyo = this.alphabetize(this.state.tokyoPresets);
		tempTokyo = tempTokyo.map((place) => {
			return(
		    	<ToggleButton onChange={e => this.handleAreaClick(e)} value={place.code} key={place.code}>
		    		{place.city}
		        </ToggleButton>
			);
		});
		return tempTokyo;
	}

	renderRoomSize() {
		var tempRoom = this.state.roomPresets;
		tempRoom = tempRoom.map((room) => {
			return(
				<ToggleButton onChange={e => this.handleRoomClick(e)} value={room.code} key={room.code}>
		    		{room.size}
		        </ToggleButton>
			);
		});
		return tempRoom;
	}

	renderLowerPrice() {
		var tempPrice = this.state.lowPricePresets;
		tempPrice = tempPrice.map((value) => {
			return(
				<ToggleButton onChange={e => this.handleLowPriceClick(e)} value={value.price} key={value.price}>
		    		{value.label} 万
		        </ToggleButton>
			);
		});
		return tempPrice;
	}

	renderHigherPrice() {
		var tempPrice = this.state.highPricePresets;
		tempPrice = tempPrice.map((value) => {
			return(
				<ToggleButton onChange={e => this.handleHighPriceClick(e)} value={value.price} key={value.price}>
		    		{value.label} 万
		        </ToggleButton>
			);
		});
		return tempPrice;
	}

	renderLowerRoomSize() {
		var tempSize = this.state.lowRoomPresets;
		tempSize = tempSize.map((value) => {
			return(
				<ToggleButton onChange={e => this.handleLowRoomClick(e)} value={value.size} key={value.size}>
		    		{value.label} m&sup2;
		        </ToggleButton>
			);
		});
		return tempSize;
	}

	renderHigherRoomSize() {
		var tempSize = this.state.highRoomPresets;
		tempSize = tempSize.map((value) => {
			return(
				<ToggleButton onChange={e => this.handleHighRoomClick(e)} value={value.size} key={value.size}>
		    		{value.label} m&sup2;
		        </ToggleButton>
			);
		});
		return tempSize;
	}

	alphabetize(val) {
		var sorted = _.sortBy(val, 'city');
		return sorted;
	}

	handleAreaClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		var checkedValue = e.target.value;
		console.log(checkedValue);
	
		var array = this.state.placesToSearch.slice();

		if(!array.includes(checkedValue)){
			array.push(checkedValue);
			this.setState({ placesToSearch: array });
		}

		else{
			_.remove(array, (val) => {
				return val === checkedValue;
			});

			this.setState({ placesToSearch: array });
		}
	}

	handleRoomClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		var checkedValue = e.target.value;
		console.log(checkedValue);
	
		var array = this.state.sizeToSearch.slice();

		if(!array.includes(checkedValue)){
			array.push(checkedValue);
			this.setState({ sizeToSearch: array });
		}

		else{
			_.remove(array, (val) => {
				return val === checkedValue;
			});

			this.setState({ sizeToSearch: array });
		}

		console.log('size to search', this.state.sizeToSearch);
	}

	handleLowPriceClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		var checkedValue = e.target.value;
		this.setState({ lowPriceToSearch: checkedValue }, () => {
			console.log(this.state.lowPriceToSearch);
		});
	}

	handleHighPriceClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		var checkedValue = e.target.value;
		this.setState({ highPriceToSearch: checkedValue }, () => {
			console.log(this.state.highPriceToSearch);
		});
	}

	handleLowRoomClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		var checkedValue = e.target.value;
		this.setState({ lowRoomToSearch: checkedValue }, () => {
			console.log(this.state.lowRoomToSearch);
		});
	}


	handleHighRoomClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		var checkedValue = e.target.value;
		this.setState({ highRoomToSearch: checkedValue }, () => {
			console.log(this.state.highRoomToSearch);
		});
	}

	renderErrors(){
		if(this.state.priceError === true){
			console.log("the lower price is " + this.state.lowPriceToSearch + "this higher price is " + this.state.highPriceToSearch);
			console.log(this.state.lowPriceToSearch > this.state.highPriceToSearch)
			return(
				<h2>Lower range price is higher than or equal higher range price!</h2>
			)
		}

		else if(this.state.areaError === true){
			return(
				<h2>Lower room area is higher than or equal to higher room area!</h2>
			)
		}

	}

	submitInfo(e) {
		// console.log("placesToSearch", this.state.placesToSearch);
		// console.log("room size", this.state.sizeToSearch);
		// console.log("low price", this.state.lowPriceToSearch);
		// console.log("high price", this.state.highPriceToSearch);
		// console.log("lower room area", this.state.lowRoomToSearch);
		// console.log("lower room area", this.state.highRoomToSearch);

		// when empty
		// placesToSearch []
		// selectBoxes.js:192 room size []
		// selectBoxes.js:193 low price 0
		// selectBoxes.js:194 high price 0
		// selectBoxes.js:195 lower room area 0
		// selectBoxes.js:196 lower room area 0
		console.log(this.state.priceError);

		if(this.state.lowPriceToSearch/10 >= this.state.highPriceToSearch/10 && this.state.lowPriceToSearch !== 0){
			// console.log(this.state.lowPriceToSearch + '>' + this.state.highPriceToSearch)
			this.setState({ priceError: true });

		}

		else if(this.state.lowRoomToSearch >= this.state.highRoomToSearch && this.state.lowRoomToSearch !== 0){
			this.setState({ areaError: true});
		}

		else{
			this.props.searchParamsWard(
				this.state.placesToSearch, 
				this.state.sizeToSearch, 
				this.state.lowPriceToSearch,
				this.state.highPriceToSearch,
				this.state.lowRoomToSearch,
				this.state.highRoomToSearch
			);

			this.setState({ priceError: false, areaError: false });
		}
		
	}

	render(){
		return(
			<div className="container-fluid">
				<div className="spaceTop">
					<div>
						<div className="formatInner">
							<h3>Search by Ward</h3>
							<ButtonToolbar>
								<ToggleButtonGroup type="checkbox">
									{this.renderTokyo()}
								</ToggleButtonGroup>
							</ButtonToolbar>
						</div>
					</div>
				</div>
				<div className="spaceTop">
					<div className="formatInner">
						<h3>Room Type</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="checkbox">
								{this.renderRoomSize()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Lower Price Range</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="lowPrices">
								{this.renderLowerPrice()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Higher Price Range</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="highPrices">
								{this.renderHigherPrice()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Lower Room Area Range</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="lowerRoom">
								{this.renderLowerRoomSize()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Higher Room Area Range</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="higherRoom">
								{this.renderHigherRoomSize()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
			    	{this.renderErrors()}
			    </div>
			    <div className="spaceBottom">
				    <Button className="spaceTop" type="submit" onClick={this.submitInfo.bind(this)}>
						Submit
				    </Button>
			    </div>
		    </div>
		);
	}
}

export default connect(null, actions)(SelectBoxes);