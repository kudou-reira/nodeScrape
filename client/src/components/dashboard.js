import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Well, Collapse } from 'react-bootstrap';
import FaClose from 'react-icons/lib/fa/close';
import * as actions from '../actions';

class Dashboard extends Component {

	constructor(){
		super();

		this.state = {
			auth: [],
			collapseOff: true,
			collapseOn: false
		}
	}

	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.auth !== this.props.auth){
	// 		if(this.props.auth !== null && this.props.auth.savedPlaces === undefined){
	// 			this.setState({ collapse: false }, () => {
	// 				console.log("collapse state", this.state.collapse);
	// 			});
	// 		}
	// 	}
	// }

	formatTrainStations(value) {
    	var format = value.map((data) => {
    		return(
    			<p>{data}</p>
    		)
    	})

    	return format;
    }

    renderCross(data){
    	if(this.props.auth){
    		return(
	    		<a href="#" className="spaceTop">
			    	<FaClose onClick={() => this.clickIcon(data)} />
			    </a>
	    	);
    	}
    }

    clickIcon(data){
    	this.props.deleteCardCollapse(data);
    }

	renderSavedLocations(){
		//also add loader here
		if(this.props.auth !== null && this.props.auth.savedPlaces !== undefined){
			var saved = this.props.auth.savedPlaces.map((data) => {
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
						    </div>
						    <h2><Button className="cardButton1"><a href={data.link} target="_blank">More information</a></Button></h2>
						</div>
						{this.renderCross(data)}
	                </article>
				);
			})
			
			return saved;
		}
	}

	renderCollapse(){
		if(this.props.auth !== null){
			if(this.props.auth.savedPlaces !== undefined){
				if(this.props.auth.savedPlaces.length < 1){
					return(
						<div>
							<Button onClick={ ()=> this.setState({ collapseOn: !this.state.collapseOn })}>
								Saved Locations
					        </Button>
					        <div className="spaceTop" />
					        <Collapse in={this.state.collapseOn}>
								<div>
						            <Well>
						            	<div className="container2">
						            		<section className="cards">
						                		{this.renderSavedLocations()}
						                	</section>
						                </div>
						            </Well>
					            </div>
					        </Collapse>
				        </div>
					);
				}

				else{
					return(
						<div>
							<Button onClick={ ()=> this.setState({ collapseOff: !this.state.collapseOff })}>
								Saved Locations
					        </Button>
					        <div className="spaceTop" />
					        <Collapse in={this.state.collapseOff}>
								<div>
						            <Well>
						            	<div className="container2">
						            		<section className="cards">
						                		{this.renderSavedLocations()}
						                	</section>
						                </div>
						            </Well>
					            </div>
					        </Collapse>
				        </div>
					);
				}
			}

			
		}
	}


	render(){
		return(
			<div>
				<h2>Dashboard</h2>
				{console.log('this is from dashboard', this.props.auth)}
				<h2>
					{this.renderCollapse()}
				</h2>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, actions)(Dashboard);