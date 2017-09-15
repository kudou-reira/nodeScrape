import React, { Component } from 'react'
import { Button, ToggleButtonGroup, ButtonToolbar, ToggleButton } from 'react-bootstrap';
import _ from 'lodash';
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
			highRoomPresets: generateHigherRoomLimits()
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
		    		{value.label} m2
		        </ToggleButton>
			);
		});
		return tempSize;
	}

	renderHigherRoomSize() {
		var tempSize = this.state.highRoomPresets;
		tempSize = tempSize.map((value) => {
			return(
				<ToggleButton onChange={e => this.handleHighPriceClick(e)} value={value.size} key={value.size}>
		    		{value.label} m2
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

	submitInfo() {
		console.log("placesToSearch", this.state.placesToSearch);
		console.log("room size", this.state.sizeToSearch);
		console.log("low price", this.state.lowPriceToSearch);
		console.log("high price", this.state.highPriceToSearch);
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
			    <div className="spaceBottom">
				    <Button className="spaceTop" type="submit" onClick={this.submitInfo.bind(this)}>
						Submit
				    </Button>
			    </div>
		    </div>
		);
	}
}

export default SelectBoxes;