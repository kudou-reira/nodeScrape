import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import Loader from 'halogen/PulseLoader';

import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import * as actions from '../actions';


class CardsModal extends Component {

	constructor() {
		super();

		this.state = {
			paginationIntervals: 12,
			ascendingPrice: true,
			descendingPrice: false,
			pageChosen: 0,
			pageCount: 0,
			paginationPlaceHolder: '12 results per page',
			apiChoicesPlaceHolder: 'Select rental agents',
			sortPlaceHolder: 'Ascending Price',
			stayOpen: false,
			disabled: false,
			apiToUse: '',
			sortVal: 'low'
		}

		this.closeModal = this.closeModal.bind(this);
		this.checkInDatabase = this.checkInDatabase.bind(this);
		this.paginationChange = this.paginationChange.bind(this);
		this.apiChoicesChange = this.apiChoicesChange.bind(this);
		this.sortChange = this.sortChange.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.results !== this.props.results){
			if(nextProps.results !== null) {
				this.setState({ pageCount: Math.ceil(nextProps.results.length/this.state.paginationIntervals), differentValues: true }, () => {
					console.log("pageCount in receive props", this.state.pageCount);
				});
			}
		}

		var tempFilter = nextProps.filter;
		var stringFilter = tempFilter.join();
		this.setState({ apiToUse: stringFilter });
	}

	closeModal() {
		this.props.nullValue(null);
		this.setState({ pageCount: 0 });
    	this.props.modalLogic(false);
    }

    formatTrainStations(value) {
    	var format = value.map((data) => {
    		return(
    			<p>{data}</p>
    		)
    	})

    	return format;
    }

    clickIconAdd(data){

    	//ADD IN ACTION CREATOR CALL SAVE CaRD
    	//ALSO FIGURE OUT HOW TO KEEP A HEART FILLED OR NOT
    	console.log('hi from click icon', data);
    	this.props.saveCard(data);
    }

    clickIconRemove(data){
    	console.log('hi from remove icon', data);
    	this.props.deleteCardModal(data);
    }

    checkInDatabase(data){
    	var propsPlaces = this.props.auth.savedPlaces;
		for(var i = 0; i < propsPlaces.length; i++){
			if(data.link === propsPlaces[i].link){
				return true;
			}
		}
    }

    renderHeart(data){
    	if(this.props.auth){
    		//check if in database
    		//just check if in database, don't need state
    		//use the result to see if it should show up shadeded or not
    		if(this.checkInDatabase(data)){
    			return(
    				<a href="#" className="lock">
				    	<FaHeartO className="icon-lock" onClick={() => this.clickIconRemove(data)} />
				    	<FaHeart className="icon-unlock" color='red' onClick={() => this.clickIconRemove(data)} />
				    </a>
    			);
    		}

    		else{
    			return(
		    		<a href="#" className="lock">
				    	<FaHeartO className="icon-unlock" onClick={() => this.clickIconAdd(data)} />
				    	<FaHeart className="icon-lock" color='red' onClick={() => this.clickIconAdd(data)}/>
				    </a>

		    	);
    		}

    	}
    }

    renderSingleCard(){

    	if(this.props.results !== null){

    		var tempResults = this.props.results;
    		console.log("rendersinglecard", tempResults);

    		var filter = this.filterApi(tempResults);
    		console.log("this is filter in card", filter);
    		var sorting = this.sortResults(filter);
    		console.log('sorting', sorting);


	    	var chunkedResults = this.assignPaginationValues(sorting);
	    	var chunkedSelectedPage = this.selectedPage(chunkedResults);

	    	console.log("this is renderSingleCard in modal", this.props.auth);

	    	//pass the data of clicked or not into renderHeart

    		var values = chunkedSelectedPage.map((data) => {
	    		return(
	    			<article className="card">
	                    <div className="single">
	                   	    <div className="spacing">
							    <h1>{data.buildingName}</h1>
							    <hr className="style2" />
							    <p className="title">{data.location}</p>
							    <p>Price Range: {data.priceRange}</p>
							    <p>Nearby Stations: </p>{this.formatTrainStations(data.trainStation)}
							    <p>Room Type: {data.roomType}</p>
							    <p>Room Size: {data.roomSize}</p>
							    <p>Properties available: {data.propertiesAvailable}</p>
							    {this.renderHeart(data)}
						    </div>
						    {this.renderCardButton(data)}
						</div>
	                </article>
	    		);
	    	})

	    	return values;
    	}
    	
    }

    renderCardButton(data){
    	if(data.averagePrice <= 10) {
    		return(
    			<h2><Button className="cardButton1"><a href={data.link} target="_blank">More information</a></Button></h2>
    		);
    	}

    	else if(data.averagePrice > 10 && data.averagePrice < 15) {
    		return(
    			<h2><Button className="cardButton2"><a href={data.link} target="_blank">More information</a></Button></h2>
    		);
    	}

    	else {
    		return(
    			<h2><Button className="cardButton3"><a href={data.link} target="_blank">More information</a></Button></h2>
    		);
    	}
    }

    assignPaginationValues(tempResults){
    	var newStart = 0;
    	var chunkResults = tempResults;
    	for(var i = 0; i < Math.ceil(chunkResults.length/this.state.paginationIntervals); i++){
    		for(var j = newStart; j < newStart + this.state.paginationIntervals; j++){
    			if(typeof chunkResults[j] !== 'undefined'){
    				chunkResults[j].index = i;
    			}
    		}
    		newStart += this.state.paginationIntervals;
    	}

    	return chunkResults;
    }

    selectedPage(value){
    	var selected = value.filter((data) => {
    		if(data.index === this.state.pageChosen){
    			return data;
    		}
    	})
    	return selected;
    }

    handlePageClick(data){
    	var selected = data.selected;

    	console.log("current state", this.state.pageChosen);
    	this.setState({ pageChosen: selected }, () => {
    		console.log("this is pageChosen in handlePageClick", this.state.pageChosen);
    	});

    }

    paginationChange(val){
    	this.setState({ paginationIntervals: val.value, paginationPlaceHolder: val.label }, () => {
    		console.log(this.state.paginationPlaceHolder);

    		var tempApi = this.state.apiToUse;
	    	tempApi = tempApi.split(',');

	    	console.log("this is tempapi in apiChoicesChange", tempApi);

	    	var tempFilter = [];
	    	var finalFilter = [];

	    	for(var i = 0; i < tempApi.length; i++){
	    		tempFilter = this.props.results.filter((api) => {
	    			return api.api === tempApi[i];
	    		})
	    		finalFilter = finalFilter.concat(tempFilter);
	    	}

			this.setState({ pageCount: Math.ceil(finalFilter.length/this.state.paginationIntervals) }, () => {
				console.log('new pagination intervals', this.state.paginationIntervals);
			});
    	})
    }

    renderPaginationIntervals(){
    	var options = [
    					{value: 12, label: '12 results per page'},
    					{value: 16, label: '16 results per page'},
    					{value: 20, label: '20 results per page'}
    				  ];

    	return(
    		<div className="pages">
	    		<div className="bind">
	    			<Select
	    				name="form-field-name"
	    				placeholder={this.state.paginationPlaceHolder}
	    				options={options}
	    				onChange={this.paginationChange}
	    			/>
	    		</div>
    		</div>
    	);
    }

    apiChoicesChange(val){
    	this.setState({ apiToUse: val }, () => {

    		console.log('api to use in apiChoicesChange', this.state.apiToUse);

    		var tempApi = this.state.apiToUse;
	    	tempApi = tempApi.split(',');

	    	console.log("this is tempapi in apiChoicesChange", tempApi);

	    	var tempFilter = [];
	    	var finalFilter = [];

	    	for(var i = 0; i < tempApi.length; i++){
	    		tempFilter = this.props.results.filter((api) => {
	    			return api.api === tempApi[i];
	    		})

	    		finalFilter = finalFilter.concat(tempFilter);
	    	}

	    	console.log('final filter length in apiChoicesChange', finalFilter.length);

			this.setState({ pageCount: Math.ceil(finalFilter.length/this.state.paginationIntervals) }, () => {
				console.log("apiChoicesChange pageCount", this.state.pageCount);
			});
    	});
    }

    renderApiChoices(){
    	var options = this.props.options;

    	return(
    		<div className="api">
	    		<div className="bind">
					<Select
						closeOnSelect={!this.state.stayOpen}
						disabled={this.state.disabled}
						multi={true}
						onChange={this.apiChoicesChange}
						options={options}
						placeholder="Select your favourite(s)"
						simpleValue
						value={this.state.apiToUse}
					/>
	    		</div>
    		</div>
    	);
    }

    sortChange(val) {
    	this.setState({ sortVal: val.value }, () => {
    		console.log("this is the new sort val", this.state.sortVal);
    	});
    }

    sortResults(data) {
    	if(this.state.sortVal === 'low'){
    		var temp = data;
    		temp.sort(function(a, b) {
		    	return a.averagePrice - b.averagePrice;
			});

			return temp;
    	}

    	else if(this.state.sortVal === 'high'){
    		var temp = data;
    		temp.sort(function(a, b) {
		    	return b.averagePrice - a.averagePrice;
			});

			return temp;
    	}
    }

    filterApi(data) {
    	var tempApi = this.state.apiToUse;
    	tempApi = tempApi.split(',');

    	console.log("this is tempapi in filterapi", tempApi);

    	var tempFilter = [];
    	var finalFilter = [];

    	for(var i = 0; i < tempApi.length; i++){
    		tempFilter = data.filter((api) => {
    			return api.api === tempApi[i];
    		})

    		console.log("this is index tempApi", tempApi[i]);
    		console.log("this is tempFilter tempApi", tempFilter);
    		finalFilter = finalFilter.concat(tempFilter);
    	}

    	return finalFilter;
    }

    renderSort() {
    	var options = [
    					{value: 'low', label: 'Ascending Price'},
    					{value: 'high', label: 'Descending Price'}
    				  ];

    	return(
    		<div className="sort">
	    		<div className="bind">
	    			<Select
	    				name="form-field-name"
	    				placeholder={this.state.sortPlaceHolder}
	    				options={options}
	    				onChange={this.sortChange}
	    			/>
	    		</div>
    		</div>
    	);
    }

	render(){
		{console.log('this is props filter', this.props.filter)}
		{console.log('this is props options', this.props.options)}
		{console.log('this is state apiToUse', this.state.apiToUse)}
		return(
			<ButtonToolbar>
		        <Modal
		          show={this.props.modal}
		          onHide={this.closeModal}
		          dialogClassName="custom-modal"
		        >
			        {this.props.results !== null 
			        	? <Modal.Header closeButton>
				            <Modal.Title id="contained-modal-title-lg">Results</Modal.Title>
				            	<div className="wrapper">
						            {this.renderPaginationIntervals()}
						            {this.renderSort()}
						            {this.renderApiChoices()}
					            </div>
				          </Modal.Header>
				        : <Modal.Header closeButton>
				            <Modal.Title id="contained-modal-title-lg">Loading your results...</Modal.Title>
				          </Modal.Header>
			        }

			        {this.props.results !== null 
			        	? <Modal.Body>
				          	<div className="container">
					            <section className="cards">
			            			{this.renderSingleCard()}
								</section>
						    </div>
				          </Modal.Body>
				        : <Modal.Body>
				          	<div className="container">
				          		<Modal.Title id="contained-modal-title-lg">If your parameters aren't narrow enough, the search may take a while! Thank you for your patience...</Modal.Title>
					            <div>
			            			<Loader color='#4DAF7C' size="24px" />
								</div>
						    </div>
				          </Modal.Body>
			        }

		            {this.props.results !== null 
		            	? <Modal.Footer>
				          	<div className="center1">
					          	<ReactPaginate 
					          		previousLabel={"previous"}
					          		nextLabel={"next"}
					          		breakLabel={<a href="#">...</a>}
					          		breakClassName={"break-me"}
					          		marginPagesDisplayed={1}
					          		pageRangeDisplayed={5}
					          		containerClassName={"pagination"}
					          		subContainerClassName={"pages pagination"}
					          		activeClassName={"active"}
					          		pageCount={this.state.pageCount}
					          		onPageChange={(data) => this.handlePageClick(data)}
					          	/>
				          	</div>
			            </Modal.Footer>
			            : null
			        }
		        </Modal>
			</ButtonToolbar>
		);
	}
}

function mapStateToProps(state) {
	return {
		modal: state.modal.value,
		auth: state.auth,
		cardExists: state.search.cardExists
	};
}

export default connect(mapStateToProps, actions)(CardsModal);