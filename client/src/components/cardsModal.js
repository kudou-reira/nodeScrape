import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CardsModal extends Component {

	constructor() {
		super();

		this.state = {
			
		}

		this.closeModal = this.closeModal.bind(this)
	}

	closeModal() {
    	// this.setState({showModal: false}, () => {
    	// 	console.log(this.state.showModal);
    	// });

    	this.props.modalLogic(false);
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
		            <h4>Wrapped Text</h4>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.closeModal}>Close</Button>
		          </Modal.Footer>
		        </Modal>
			</ButtonToolbar>
		);
	}
}

function mapStateToProps(state) {
	return {
		modal: state.modal.value
	};
}

export default connect(mapStateToProps, actions)(CardsModal);