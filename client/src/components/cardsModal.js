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
		          	<div>
			            <section className="cards">
			                <article className="card">
			                    <div className="single">
			                   	    <div className="spacing">
									    <h1>John Doe</h1>
									    <p className="title">CEO & Founder, Example</p>
									    <p>Harvard University</p>
								    </div>
								  <h2><Button className="cardButton1">More information</Button></h2>
								</div>
			                </article>
						    <article className="card">
						       <p>content for card two</p>
						    </article>
							<article className="card">
						        <p>content for card three</p>
						    </article>
							<article className="card">
						        <p>content for card four</p>
						    </article>
						</section>
				    </div>
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