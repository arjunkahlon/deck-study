import React from 'react';
import DeckList from '../components/deck-list';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import AppContext from '../lib/app-context';

class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      decks: [],
      newDeckName: '',
      isLoading: true,
      modalOpen: false
    });
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeckNameChange = this.handleDeckNameChange.bind(this);
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${this.props.token}`
      }
    };

    fetch('/api/decks', req)
      .then(res => res.json())
      .then(data => {
        this.setState({
          decks: data,
          isLoading: false
        });
      })
      .catch(err => {
        const { handleNetworkError } = this.context;
        handleNetworkError(err);
      });
  }

  openModal = () => this.setState({
    modalOpen: true
  });

  closeModal = () => this.setState({
    modalOpen: false
  });

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newDeckName) {
      const { newDeckName } = this.state;
      const reqBody = {};
      reqBody.newDeckName = newDeckName;

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${this.props.token}`
        },
        body: JSON.stringify(reqBody)
      };

      fetch('/api/deck', req)
        .then(res => res.json())
        .then(result => {
          const updatedDecks = this.state.decks.concat(result);
          this.setState({
            newDeckName: '',
            isLoading: false,
            decks: updatedDecks
          });
        })
        .catch(err => console.error(err));
    }
  }

  handleDeckNameChange(event) {
    this.setState({ newDeckName: event.target.value });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className='container shadow-lg mb-3'>
          <div className='row bg-primary-gradient-right rounded'>
            <div className='col-12 text-white decks-header mt-2 p-4 pb-2 rounded'>
              <div className='ps-2'>
                <h2 className='font-open-sans'>Decks</h2>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 bg-light pb-4 rounded'>
              < DeckList decks={this.state.decks} />
              <div className='text-center'>
                <Button variant='outline-secondary' size='lg'
                  onClick={this.openModal}>Create New Deck</Button>
              </div>
            </div>
          </div>
          <Modal show={this.state.modalOpen}
            dialogClassName='custom-dialog'
            onHide={this.closeModal}>
            <Modal.Header closeButton className='pb-1 bg-primary bg-gradient rounded'>
              <Modal.Title className='text-center w-100'>
                <div>
                  <h2 className='text-light font-open-sans font-open-sans'>
                    Create New Deck</h2>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmit}>
                <div className='text-center'>
                  <label className='d-block text-secondary font-open-sans'
                    htmlFor='deckname'>Please enter the title of your new Deck.</label>
                  <div className='deck-input-wrapper input-group input-group-lg row d-flex m-auto mt-4'>
                    <input id='deckname' className='input-group-text' type="text" autoFocus="autofocus"
                      placeholder='e.g. C++, Biology, Algorithms, etc.' value={this.state.value}
                      onChange={this.handleDeckNameChange} />
                  </div>
                  <div className='p-3'>
                    <Button variant='primary'
                      className='bg-gradient'
                      type="submit"
                      value="Submit"
                      onClick={this.closeModal}>Add Deck</Button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return (
        <div className='row'>
          <div className='col'>
            <div className='container text-center'>
              <div className='mt-4'>
                <Spinner animation="border"
                  variant="primary"
                  style={{ width: '5rem', height: '5rem' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Decks;

Decks.contextType = AppContext;
