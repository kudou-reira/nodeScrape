import React, { Component  } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './header';
import Dashboard from './dashboard';
import LocationSearched from './locationSearched';
import Searching from './searching';

//location-search should have the search params

class App extends Component {

	componentDidMount() {
		this.props.fetchUser();
	}

	render(){
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/saved-locations" component={Dashboard} />
						<Route path='/' component={Searching} />
						<Route path="/location-search" component={LocationSearched} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);