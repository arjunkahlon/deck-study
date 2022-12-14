import React from 'react';
import Card from 'react-bootstrap/Card';
import EmptyPrompt from './empty-prompt';

class PreviewCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: true
    };
  }

  renderList() {
    const { cards } = this.props.deck;
    return (
      cards.map((card, index) => {
        return (
          <Card key={index} className='shadow-lg mt-2 mb-3 pb-3'>
            <Card.Title className='bg-primary-gradient-right bg-gradient rounded pt-1'>
              <h6 className='text-secondary text-light font-open-sans p-2 h6'>
                Card {index + 1} of {cards.length}</h6>
            </Card.Title>
            <Card.Body>
              <div className='row'>
                <div className='col-md-6'>
                  <h6 className='text-secondary'>Question:</h6>
                  <div className='mb-5 preserve-white-space'>
                    <p className='font-open-sans'>{card.question}</p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <h6 className='text-secondary'>Answer:</h6>
                  <div className='preserve-white-space'>
                    <p className='font-open-sans'>{card.answer}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })
    );
  }

  render() {
    if (this.props.deck.cards.length === 0) {
      return (
        <EmptyPrompt prompt="No Cards in Deck" />
      );
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='pt-3'>
              {this.renderList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewCards;
