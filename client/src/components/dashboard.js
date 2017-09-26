import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {

	constructor(){
		super();

		this.state = {
			auth: []
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.auth !== this.props.auth){
			
			this.setState({ auth: nextProps.auth }, () => {
				console.log("auth in receive props", this.state.auth);
			});
			
		}
	}

	renderSavedLocations(){
		//make this a card
		//also add loader here
		//figure out how to redirect on login
		if(this.props.auth !== null){
			var saved = this.props.auth.savedPlaces.map((data) => {
				return(
					<div>
						{data.averagePrice}
					</div>
				);
			})
			
			return saved;
		}
	}


	render(){
		return(
			<div>
				<h2>Dashboard</h2>
				{console.log('this is from dashboard', this.props.auth)}
				<h2>Saved locations: {this.renderSavedLocations()}</h2>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, null)(Dashboard);