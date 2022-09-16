import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EditCards from '../components/edit-cards';

class DeckCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      cards: [],
      currentTab: 'browse',
      isLoading: true
    });
    this.addCard = this.updateCards.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  updateCards(updatedCards) {
    this.setState({
      cards: updatedCards
    });
  }

  handleSelect(key) {
    this.setState({
      currentTab: key
    });
  }

  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <Tabs defaultActiveKey={this.state.currentTab}
                  id='deck-card-tabs'
                  className='mb-6'
                  fill
                  onSelect={this.handleSelect}>
              <Tab eventKey="browse" title="Browse" />
              <Tab eventKey="edit" title="Edit">
                <EditCards deckId={this.props.deckId} cards = {this.cards}/>
              </Tab>
              <Tab eventKey="preview" title="Preview" />

            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default DeckCards;
