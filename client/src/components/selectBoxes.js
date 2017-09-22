import React, { Component } from 'react'
import { Button, ToggleButtonGroup, ButtonToolbar, ToggleButton, Modal } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CardsModal from './cardsModal';

import tokyoValues from '../lib/tokyo/tokyoValues';
import roomSize from '../lib/roomParams/roomSize';
import buildingAge from '../lib/roomParams/buildingAge';
import walkingDistance from '../lib/roomParams/walkingDistance';
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
			highPriceToSearch: 9999999,
			highPricePresets: generateHigherLimits(),
			lowRoomToSearch: 0,
			lowRoomPresets: generateLowerRoomLimits(),
			highRoomToSearch: 99999,
			highRoomPresets: generateHigherRoomLimits(),
			buildingAge: 0,
			buildingAgePresets: buildingAge,
			walkingDistance: 0,
			walkingDistancePresets: walkingDistance,
			depositMoney: false,
			keyMoney: false,
			priceError: false,
			areaError: false,
			submitted: false
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

	renderBuildingAge() {
		var tempBuildingAge = this.state.buildingAgePresets;
		tempBuildingAge = tempBuildingAge.map((value) => {
			return(
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={value.value} key={value.value}>
		    		{value.year}
		        </ToggleButton>
			);
		});
		return tempBuildingAge;
	}

	renderWalkingDistance() {
		var tempWalkingDistance = this.state.walkingDistancePresets;
		tempWalkingDistance = tempWalkingDistance.map((value) => {
			return(
				<ToggleButton onChange={e => this.handleExtraParamsClick(e)} value={value.minutes} key={value.minutes}>
		    		{value.distance}
		        </ToggleButton>
			);
		});
		return tempWalkingDistance;
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
				this.state.keyMoney,
				this.state.buildingAge,
				this.state.walkingDistance
			);

			this.setState({ priceError: false, areaError: false, placesToSearchError: false, sizeToSearchError: false });

			console.log("this is the state of submitted", this.state.submitted);

			var x = this.state.submitted;
			console.log(x);
			var x = !x;
			console.log(x);
			this.setState({submitted: x}, () => {
					console.log(this.state.submitted);
					this.props.modalLogic(this.state.submitted);
					this.setState({submitted: false});
				});
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
						<h3>Minimum Price</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="lowPriceToSearch">
								{this.renderLowerPrice()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Maximum Price</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="highPriceToSearch">
								{this.renderHigherPrice()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Minimum Room Area</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="lowRoomToSearch">
								{this.renderLowerRoomSize()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Maximum Room Area</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="highRoomToSearch">
								{this.renderHigherRoomSize()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Building Age</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="buildingAge">
								{this.renderBuildingAge()}
							</ToggleButtonGroup>
						</ButtonToolbar>
					</div>
			    </div>
			    <div className="spaceTop">
					<div className="formatInner">
						<h3>Walking Distance</h3>
						<ButtonToolbar>
							<ToggleButtonGroup type="radio" name="walkingDistance">
								{this.renderWalkingDistance()}
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
			    <CardsModal />
			    {console.log('these are results', this.props.results)}

		    </div>
		);
	}
}

function mapStateToProps(state){
	return {
		results: state.search.resultValuesWard
	};
}

export default connect(mapStateToProps, actions)(SelectBoxes);