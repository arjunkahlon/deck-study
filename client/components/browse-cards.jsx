import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EmptyPrompt from './empty-prompt';

class BrowseCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      question: true,
      cardJump: this.props.cardIndex
    });
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    this.setState({
      question: !this.state.question
    });
  }

  render() {
    const { deck } = this.props;

    const cardHeader = this.state.question
      ? 'Question'
      : 'Answer';

    const cardFlipPrompt = cardHeader === 'Question'
      ? 'Answer'
      : 'Question';

    if (deck.cards.length === 0) {
      return (
        <EmptyPrompt prompt="No Cards in Deck" />
      );
    }
    return (
      <div className='container mt-4'>
        <div className='row'>
          <div className='col text-end'>
            <a href={`#${this.props.route.path}?deckId=${this.props.deck.deckId}&tab=browse&cardIndex=${((this.props.cardIndex - 1) + (this.props.deckLength)) % (this.props.deckLength)}`}>
              <i className='bi bi-chevron-left text-light lead fs-1 bg-primary rounded' />
            </a>
          </div>
          <div className='col-6 text-center pt-2'>
            <h2 className='h5 text-primary font-open-sans mb-4 bg'>Card {this.props.cardIndex + 1} of {deck.cards.length}</h2>
          </div>
          <div className='col'>
            <a href={`#${this.props.route.path}?deckId=${this.props.deck.deckId}&tab=browse&cardIndex=${((this.props.cardIndex + 1) % (this.props.deckLength))}`}>
              <i className='bi bi-chevron-right text-light lead fs-1 bg-primary rounded' />
            </a>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <Card className='shadow-lg mb-5 bg-white rounded'
                  style={{ height: '22rem' }}>
              <Card.Title className='bg-primary bg-gradient rounded'>
                <h5 className='text-secondary text-light font-open-sans p-2 h6'>
                  {cardHeader}</h5>
              </Card.Title>
              <Card.Body onClick={this.flipCard}>
                <div className='mt-5'>
                  <p className='text-center font-open-sans pt-3'>
                    {
                      this.state.question
                        ? (
                            deck.cards[this.props.cardIndex].question
                          )
                        : (
                            deck.cards[this.props.cardIndex].answer
                          )
                    }
                  </p>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className='row'>
                  <div className='col'>
                    <div className='text-secondary font-open-sans rounded text-end'>
                      <span>{this.props.deck.deckName}</span>
                    </div>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-6 mx-auto text-center'>
            <Button variant='primary'
              className='bg-gradient shadow-lg rounded font-open-sans m-2'
              onClick={this.flipCard}>Reveal {cardFlipPrompt}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseCards;
