import React, { Component } from 'react';
const google = window.google;

class GoogleMap extends Component {

	componentDidMount() {

		new google.maps.Map(this.refs.map, {
			zoom: 12,
			center: {
				lat: 35.6895,
				lng: 139.6917
			}
		});
	}


	render() {
		return(
			<div id="content">
				<div ref="map" style={{ width: 500, height: 500, }}/>
			</div>
		);
	}
}

export default GoogleMap;