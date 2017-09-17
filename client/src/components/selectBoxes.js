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
			placesToSearchError: false,
			tokyoPresets: tokyoValues,
			sizeToSearch: [],
			sizeToSearchError: false,
			roomPresets: roomSize,
			lowPriceToSearch: 0,
			lowPricePresets: generateLowerLimits(),
			highPriceToSearch: 0,
			highPricePresets: generateHigherLimits(),
			lowRoomToSearch: 0,
			lowRoomPresets: generateLowerRoomLimits(),
			highRoomToSearch: 0,
			highRoomPresets: generateHigherRoomLimits(),
			depositMoney: false,
			keyMoney: false,
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
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={value.price} key={value.price}>
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
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={value.price} key={value.price}>
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
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={value.size} key={value.size}>
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
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={value.size} key={value.size}>
		    		{value.label} m&sup2;
		        </ToggleButton>
			);
		});
		return tempSize;
	}

	renderDeposit() {
		var depositTemp = (
			<ToggleButtonGroup type="radio" name="depositMoney">
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={true} key={1}>
		    		Yes
		        </ToggleButton>
		        <ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={false} key={2}>
		    		No
		        </ToggleButton>
	        </ToggleButtonGroup>
	    );
	    return depositTemp;
	}

	renderKey() {
		var keyTemp = (
			<ToggleButtonGroup type="radio" name="keyMoney">
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={true} key={1}>
		    		Yes
		        </ToggleButton>
		        <ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={false} key={2}>
		    		No
		        </ToggleButton>
	        </ToggleButtonGroup>
	    );
	    return keyTemp;
	}

	alphabetize(val) {
		var sorted = _.sortBy(val, 'city');
		return sorted;
	}

	handleAreaClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		var checkedValue = e.target.value;

	
		var array = this.state.placesToSearch.slice();

		if(!array.includes(checkedValue)){
			array.push(checkedValue);
			this.setState({ placesToSearch: array }, () => console.log(this.state.placesToSearch));
		}

		else{
			_.remove(array, (val) => {
				return val === checkedValue;
			});

			this.setState({ placesToSearch: array }, () => console.log(this.state.placesToSearch));
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

	handleExtraParamsClick(e) {
		//checks if clicked or not, could be useful
		//let isChecked = e.target.checked;
		this.setState({ [e.target.name]: e.target.value }, () => {
			console.log(this.state.lowPriceToSearch);
		});
	}


	renderErrors(){
		if(this.state.lowPriceToSearch/10 >= this.state.highPriceToSearch/10 && this.state.lowPriceToSearch !== 0){
			console.log("the lower price is " + this.state.lowPriceToSearch + "this higher price is " + this.state.highPriceToSearch);
			console.log(this.state.lowPriceToSearch > this.state.highPriceToSearch)
			return(
				<h2>Lower range price is higher than or equal higher range price!</h2>
			)
		}

		else if(this.state.lowRoomToSearch >= this.state.highRoomToSearch && this.state.lowRoomToSearch !== 0){
			return(
				<h2>Lower room area is higher than or equal to higher room area!</h2>
			)
		}

		else if(this.state.placesToSearch.length < 1){
			console.log("this is the length of placesToSearch", this.state.placesToSearch.length);
			console.log("places to search error", this.state.placesToSearchError)
			return(
				<h2>Please select at least one ward</h2>
			)
		}

		else if(this.state.sizeToSearch < 1){
			return(
				<h2>Please select at least one room type</h2>
			)
		}

	}

	submitInfo(e) {

		if(this.state.placesToSearch.length < 1){
			this.setState({ placesToSearchError: true });
		}

		else if(this.state.sizeToSearch.length < 1){
			this.setState({ sizeToSearchError: true });
		}

		else if(this.state.lowPriceToSearch/10 >= this.state.highPriceToSearch/10 && this.state.lowPriceToSearch !== 0){
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
				this.state.highRoomToSearch,
				this.state.depositMoney,
				this.state.keyMoney
			);

			this.setState({ priceError: false, areaError: false, placesToSearchError: false, sizeToSearchError: false });
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
							<ToggleButtonGroup type="radio" name="lowPriceToSearch">
								{this.renderLowerPrice()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Higher Price Range</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="highPriceToSearch">
								{this.renderHigherPrice()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Lower Room Area Range</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="lowRoomToSearch">
								{this.renderLowerRoomSize()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Higher Room Area Range</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="highRoomToSearch">
								{this.renderHigherRoomSize()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Deposit Required?</h3>
						<ButtonToolbar>
							{this.renderDeposit()}
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Key Money Required?</h3>
						<ButtonToolbar>
							{this.renderKey()}
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