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
    const { cards } = this.props.deckCards;
    return (
      cards.map((card, index) => {
        return (
          <Card key={index} className='m-4 pb-3'>
            <Card.Title className='bg-primary pt-1'>
              <h6 className='text-secondary text-light font-open-sans p-2 h6'>
                Card {index + 1} of {cards.length}</h6>
            </Card.Title>
            <Card.Body>
              <div className='row'>
                <div className='col-md-6'>
                  <h6 className='text-secondary'>Question:</h6>
                  <div className='mb-5'>
                    <p className='font-open-sans'>{card.question}</p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <h6 className='text-secondary'>Answer:</h6>
                  <div className=''>
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
    if (this.props.deckCards.cards.length > 0) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div>{this.renderList()}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <EmptyPrompt prompt = "No Cards in Deck"/>
      );
    }

  }
}

export default PreviewCards;
