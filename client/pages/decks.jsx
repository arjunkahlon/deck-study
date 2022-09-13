import React from 'react';
import DeckList from '../components/deck-list';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      modalOpen: false,
      decks: [],
      newDeckName: ''
    });
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeckNameChange = this.handleDeckNameChange.bind(this);
  }

  openModal = () => this.setState({ modalOpen: true });
  closeModal = () => this.setState({ modalOpen: false });

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newDeckName) {
      const { newDeckName } = this.state;
      const reqBody = {};
      reqBody.newDeckName = newDeckName;

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      };

      fetch('/api/deck', req)
        .then(res => res.json())
        .then(result => {
          this.setState({
            newDeckName: ''
          });
        })
        .catch(err => console.error(err));
    }
  }

  handleDeckNameChange(event) {
    this.setState({ newDeckName: event.target.value });
  }

  render() {

    return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-white bg-primary decks-header mt-2 p-4 pb-0'>
          <h2>Course Decks</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 bg-light pb-4'>
          < DeckList decks={this.state.decks} addDeck={this.addDeck} openModal={this.openModal} closeModal={this.closeModal}/>
            <Button variant='outline-secondary' size='lg' onClick={this.openModal}>Add A New Course Deck</Button>
        </div>
      </div>
      <Modal show={this.state.modalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className='text-center'>
                <h2>Add A Deck</h2>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className='text-center'>
                <label className='d-block' htmlFor='deckname'>Enter New Deck Name</label>
                <div className='deck-input-wrapper mt-2'>
                  <input id='deckname' type="text" value={this.state.value} onChange={this.handleDeckNameChange} />
                </div>
                <div className='p-3'>
                  <Button variant='primary' type="submit" value="Submit" onClick={this.closeModal}>Add Deck</Button>
                  </div>
              </div>
            </form>
          </Modal.Body>
      </Modal>
    </div>
    );
  }
}

export default Decks;
