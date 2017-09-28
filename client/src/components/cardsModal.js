import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
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
			paginationPlaceHolder: 'Select desired results per page',
			apiChoicesPlaceHolder: 'Select rental agents',
			stayOpen: false,
			disabled: false,
			apiToUse: 'apaman,gaijinpot'
		}

		this.closeModal = this.closeModal.bind(this);
		this.checkInDatabase = this.checkInDatabase.bind(this);
		this.paginationChange = this.paginationChange.bind(this);
		this.apiChoicesChange = this.apiChoicesChange.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.results !== this.props.results){
			this.setState({ pageCount: Math.ceil(nextProps.results.length/this.state.paginationIntervals) }, () => {
				console.log("pageCount in receive props", this.state.pageCount);
			});
		}
	}

	closeModal() {
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
	    	var chunkedResults = this.assignPaginationValues(tempResults);

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
							    <p>Properties available: {data.propertiesAvailable}</p>
							    {this.renderHeart(data)}
						    </div>
						    <h2><Button className="cardButton1"><a href={data.link} target="_blank">More information</a></Button></h2>
						</div>
	                </article>
	    		);
	    	})

	    	return values;
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
    		this.setState({ pageCount: Math.ceil(this.props.results.length/this.state.paginationIntervals) }, () => {
				console.log("pageCount in receive props", this.state.pageCount);
			});
    		console.log('new pagination intervals', this.state.paginationIntervals);
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
    		console.log(this.state.apiToUse);
    		console.log("this is type of", typeof this.state.apiToUse);
    	});
    }

    renderApiChoices(){
    	var options = [
    					{value: 'apaman', label: 'Apaman'},
    					{value: 'gaijinpot', label: 'Gaijin Pot'}
    				  ];

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

	render(){
		return(
			<ButtonToolbar>
		        <Modal
		          show={this.props.modal}
		          onHide={this.closeModal}
		          dialogClassName="custom-modal"
		        >
			        {this.props.results !== null 
			        	? <Modal.Header closeButton>
				            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
				            	<div className="wrapper">
						            {this.renderPaginationIntervals()}
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
					            <div>
			            			Loading your results...
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