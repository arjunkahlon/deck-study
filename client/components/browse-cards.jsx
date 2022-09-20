import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EmptyPrompt from './empty-prompt';

class BrowseCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      question: true,
      cardJump: this.props.currentCardIndex
    });
    this.flipCard = this.flipCard.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  flipCard() {
    this.setState({
      question: !this.state.question
    });
  }

  handleCardChange(event) {
    const newIndex = parseInt(event.target.value) - 1;
    if (newIndex >= 0 && newIndex <= this.props.deck.cards.length - 1) {
      this.props.updateCardIndex(newIndex);
      this.setState({
        cardJump: newIndex
      });
    }
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
            <i className='bi bi-chevron-left text-primary lead fs-1'
              onClick={this.props.previousCard}></i>
          </div>
          <div className='col text-center pt-2'>
            <input type="text"
              size="3"
              placeholder={this.props.currentCardIndex + 1}
              className='text-center'
              onChange={this.handleCardChange}></input>
          </div>
          <div className='col'>
            <i className='bi bi-chevron-right text-primary lead fs-1'
              onClick={this.props.nextCard}></i>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <Card className='shadow-lg mb-5 bg-white rounded'
                  style={{ height: '20rem' }}>
              <Card.Title className='bg-primary bg-gradient rounded'>
                <h5 className='text-secondary text-light font-open-sans p-2 h6'>
                  {cardHeader}</h5>
              </Card.Title>
              <Card.Body onClick={this.flipCard}>
                <div className='mt-5'>
                  <p className='text-center font-open-sans'>
                    {
                      this.state.question
                        ? (
                            deck.cards[this.props.currentCardIndex].question
                          )
                        : (
                            deck.cards[this.props.currentCardIndex].answer
                          )
                    }
                  </p>
                </div>
              </Card.Body>
              <Card.Footer onClick={this.props.nextCard}>
                <div className='text-end text-secondary font-open-sans rounded'>
                  <span>Card {this.props.currentCardIndex + 1} of {deck.cards.length}</span>
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
