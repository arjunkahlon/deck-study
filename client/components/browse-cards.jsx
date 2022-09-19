import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EmptyPrompt from './empty-prompt';

class BrowseCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      question: true
    });
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    this.setState({
      question: !this.state.question
    });
  }

  render() {
    const { deckCards } = this.props;

    const cardHeader = this.state.question
      ? 'Question'
      : 'Answer';

    const cardFlipPrompt = cardHeader === 'Question'
      ? 'Answer'
      : 'Question';

    if (deckCards.cards.length > 0) {
      return (
        <div className='container mt-4'>
          <div className='row'>
            <div className='col text-center'>
              <i className='bi bi-chevron-left text-primary lead fs-1'
                  onClick={this.props.previousCard}></i>
              <i className='bi bi-chevron-right text-primary lead fs-1'
                  onClick={this.props.nextCard}></i>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 mx-auto'>
              <Card onClick={this.flipCard}
                    className='border-secondary'
                    style={{ height: '20rem' }}>
                <Card.Title className='bg-primary'>
                  <h5 className='text-secondary text-light font-open-sans p-2 h6'>
                    {cardHeader}</h5>
                </Card.Title>
                <Card.Body>
                  <div className='mt-5'>
                    <p className='text-center font-open-sans'>
                      {
                        this.state.question
                          ? (
                              deckCards.cards[this.props.currentCardIndex].question
                            )
                          : (
                              deckCards.cards[this.props.currentCardIndex].answer
                            )
                      }
                    </p>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className='text-end font-open-sans'>
                    <span>Card {this.props.currentCardIndex + 1} of {deckCards.cards.length}</span>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
          <div className='row'>
            <div className='col col-md-6 mx-auto text-center'>
              <Button variant='primary'
                className='font-open-sans m-2'
                onClick={this.flipCard}>Reveal {cardFlipPrompt}
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <EmptyPrompt prompt="No Cards in Deck"/>
      );
    }
  }
}

export default BrowseCards;
