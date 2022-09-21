import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import EditCards from '../components/edit-cards';
import BrowseCards from '../components/browse-cards';
import PreviewCards from '../components/preview-cards';
import AppContext from '../lib/app-context';

class DeckCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      deck: null,
      isLoading: true
    });
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    // this.nextCard = this.nextCard.bind(this);
    // this.previousCard = this.previousCard.bind(this);
    // this.updateCardIndex = this.updateCardIndex.bind(this);
  }

  handleAddCard(card) {
    const deckCopy = Object.assign([], this.state.deck);
    deckCopy.cards = deckCopy.cards.concat(card);
    this.setState({
      deck: deckCopy
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
          deck: data,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { route } = this.context;

    if (!this.state.isLoading) {
      const deckLength = this.state.deck.cards.length;

      return (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <Tabs defaultActiveKey={this.props.tab}
                id='deck-card-tabs'
                activeKey={this.props.tab}
                justify={true}
                unmountOnExit = {true}
                fill
                onSelect={this.handleSelect}>
                <Tab eventKey="browse"
                  title={<a href={`#${route.path}?deckId=${this.props.deckId}&tab=browse&cardIndex=${this.props.cardIndex}`}
                            className='tab-anchor'>Browse</a>}>
                  <BrowseCards deck={this.state.deck}
                               deckLength = {deckLength}
                               route = {route}
                               cardIndex = {this.props.cardIndex}/>
                </Tab>
                <Tab eventKey="edit"
                  title={<a href={`#${route.path}?deckId=${this.props.deckId}&tab=edit&cardIndex=${this.props.cardIndex}`}
                            className='tab-anchor'>Edit</a>}>
                  <EditCards deckId={this.props.deckId}
                             deck={this.state.deck}
                             cardIndex = {this.props.cardIndex}
                             route = {route}
                             deckLength={deckLength}
                             updateCards = {this.updateCards}
                             handleAddCard = {this.handleAddCard}/>
                </Tab>
                <Tab eventKey="preview"
                  title={<a href={`#${route.path}?deckId=${this.props.deckId}&tab=preview&cardIndex=${this.props.cardIndex}`}
                            className='tab-anchor'>Preview</a>}>
                  <PreviewCards deck = {this.state.deck}
                                deckLength={deckLength}/>
                </Tab>
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
DeckCards.contextType = AppContext;

export default DeckCards;
