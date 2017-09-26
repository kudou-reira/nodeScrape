import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import * as actions from '../actions';


class CardsModal extends Component {

	constructor() {
		super();

		this.state = {
			paginationIntervals: 13,
			ascendingPrice: true,
			descendingPrice: false,
			pageChosen: 0,
			pageCount: 0
		}

		this.closeModal = this.closeModal.bind(this)
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

    clickIcon(data){

    	//ADD IN ACTION CREATOR CALL SAVE CaRD
    	//ALSO FIGURE OUT HOW TO KEEP A HEART FILLED OR NOT
    	console.log('hi from click icon', data);
    	this.props.saveCard(data);
    }

    renderHeart(data){
    	if(this.props.auth){
    		return(
	    		<a href="#" className="lock">
			    	<FaHeartO className="icon-unlock" onClick={() => this.clickIcon(data)} />
			    	<FaHeart className="icon-lock" color='red' onClick={() => this.clickIcon(data)}/>
			    </a>
	    	);
    	}
    	
    }

    renderSingleCard(){

    	if(this.props.results !== null){

    		var tempResults = this.props.results;
	    	var chunkedResults = this.assignPaginationValues(tempResults);

	    	var chunkedSelectedPage = this.selectedPage(chunkedResults);

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

	render(){
		return(
			<ButtonToolbar>
		        <Modal
		          show={this.props.modal}
		          onHide={this.closeModal}
		          dialogClassName="custom-modal"
		        >
		          <Modal.Header closeButton>
		            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<div className="container">
			            <section className="cards">
	            			{this.renderSingleCard()}
						</section>
				    </div>
		          </Modal.Body>
		          <Modal.Footer>
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
		        </Modal>
			</ButtonToolbar>
		);
	}
}

function mapStateToProps(state) {
	return {
		modal: state.modal.value,
		auth: state.auth
	};
}

export default connect(mapStateToProps, actions)(CardsModal);