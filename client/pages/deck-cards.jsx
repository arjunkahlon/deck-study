import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LoadSpinner from '../components/loading-spinner';
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
    this.handleEditCard = this.handleEditCard.bind(this);
  }

  handleAddCard(card) {
    const deckCopy = Object.assign({}, this.state.deck);
    deckCopy.cards = deckCopy.cards.concat(card);
    this.setState({
      deck: deckCopy
    });
  }

  handleEditCard(card) {
    const deckCopy = Object.assign({}, this.state.deck);
    const cardsCopy = this.state.deck.cards.slice();
    cardsCopy[this.props.cardIndex] = card;
    deckCopy.cards = cardsCopy;
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
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${this.props.token}`
      }
    };

    fetch(`/api/decks/${this.props.deckId}?sortBy=createdAt`, req)
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

    if (this.state.isLoading) {
      return (
        <LoadSpinner />
      );
    }
    const { route } = this.context;
    const deckLength = this.state.deck.cards.length;
    const { token } = this.props;

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
                            token = {token}
                            deckLength={deckLength}
                            updateCards = {this.updateCards}
                            handleAddCard = {this.handleAddCard}
                            handleEditCard = {this.handleEditCard}/>
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
  }
}

DeckCards.contextType = AppContext;

export default DeckCards;
