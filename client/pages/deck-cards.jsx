import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import EditCards from '../components/edit-cards';
import BrowseCards from '../components/browse-cards';

class DeckCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      deckCards: null,
      currentCardIndex: null,
      currentTab: 'browse',
      isLoading: true
    });
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.previousCard = this.previousCard.bind(this);
  }

  nextCard() {
    const nextIndex = (this.state.currentCardIndex + 1) % this.state.deckCards.cards.length;
    this.setState({
      currentCardIndex: nextIndex
    });
  }

  previousCard() {
    const previousIndex = (
      (this.state.currentCardIndex - 1) + this.state.deckCards.cards.length
    ) % this.state.deckCards.cards.length;
    this.setState({
      currentCardIndex: previousIndex
    });
  }

  handleAddCard(card) {
    const updatedCards = this.state.deckCards.cards.concat(card);
    const updatedDeck = this.state.deckCards;
    updatedDeck.cards = updatedCards;
    this.setState({
      deckCards: updatedDeck
    });
  }

  handleSelect(key) {
    this.setState({
      currentTab: key
    });
  }

  componentDidMount() {
    fetch(`/api/decks/${this.props.deckId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          deckCards: data,
          currentCardIndex: data.cards.length - 1,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <Tabs defaultActiveKey={this.state.currentTab}
                id='deck-card-tabs'
                className='mb-6'
                fill
                onSelect={this.handleSelect}>
                <Tab eventKey="browse" title="Browse">
                  <BrowseCards deckCards = {this.state.deckCards}
                               currentCardIndex = {this.state.currentCardIndex}
                               nextCard = {this.nextCard}
                               previousCard = {this.previousCard}/>
                </Tab>
                <Tab eventKey="edit" title="Edit">
                  <EditCards deckId={this.props.deckId}
                             deckCards={this.state.deckCards}
                             updateCards = {this.updateCards}
                             handleAddCard = {this.handleAddCard}/>
                </Tab>
                <Tab eventKey="preview" title="Preview" />
              </Tabs>
            </div>
          </div>
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
                        style={{ width: '5rem', height: '5rem' }}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DeckCards;
