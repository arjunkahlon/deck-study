import React from 'react';
import LoadSpinner from '../components/loading-spinner';
import shuffleDeck from '../lib/shuffle-deck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class StudyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      deck: null,
      cards: null,
      card: null,
      cardDrawn: false,
      cardRevealed: false,
      isLoading: true,
      index: 0
    });

    this.difficultyTheme = ['bg-blue', 'bg-success', 'bg-warning', 'bg-orange', 'bg-danger'];

    this.drawCard = this.drawCard.bind(this);
    this.revealCard = this.revealCard.bind(this);
  }

  drawCard() {
    const cardsCopy = [...this.state.cards];

    const currentIndex = this.state.index;
    let newIndex = null;

    if (currentIndex === cardsCopy.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }

    const newCard = cardsCopy[currentIndex];

    this.setState({
      card: newCard,
      cardDrawn: true,
      index: newIndex
    });
  }

  revealCard(e) {
    this.setState({
      cardRevealed: true
    });
  }

  handleRateCard(e, difficulty) {
    this.setState({
      isLoading: true
    });
    const cardId = this.state.card.cardId;

    if (difficulty) {
      const reqBody = {};
      reqBody.difficulty = difficulty;

      const req = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      };

      fetch(`/api/card/difficulty/${cardId}`, req)
        .then(res => res.json())
        .then(result => {
          this.setState({
            cardDrawn: false,
            cardRevealed: false,
            isLoading: false
          });
        });
    }
  }

  componentDidMount() {
    fetch(`/api/decks/${this.props.deckId}?sortBy=difficulty`)
      .then(res => res.json())
      .then(data => {
        const shuffledCards = shuffleDeck(data.cards);
        this.setState({
          deck: data,
          cards: shuffledCards,
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

    if (!this.state.cardDrawn) {
      return this.drawCard();
    }

    return (
      <div className='container mt-4'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <Card style={{ height: '25rem' }}>
              <Card.Header className={`${this.difficultyTheme[this.state.card.difficulty - 1]}`} />
              <Card.Body>

                {
                  this.state.cardRevealed
                    ? (
                        <div>
                          <div className='row'>
                            <div className='col'>
                              <h5 className='text-secondary'>Q</h5>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col text-center'>
                              <p className='text-secondary mt-3'>{this.state.card.question}</p>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col'>
                            <h5 className='text-secondary font-weight-bold mt-5'>A</h5>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col text-center'>
                              <p className='font-weight-bold'>{this.state.card.answer}</p>
                            </div>
                          </div>
                        </div>
                      )
                    : (
                        <div>
                          <div className='row'>
                            <div className='col'>
                              <h5 className='text-secondary'>Q</h5>
                            </div>
                          </div>
                          <div className='text-center mt-5'>
                            <div className='pt-5'>
                              <p>{this.state.card.question}</p>
                            </div>
                          </div>
                        </div>
                      )
                }
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
           {
              this.state.cardRevealed
                ? (
                    <div className='text-center mt-2'>
                      <Button className="bg-blue btn-circle m-2"
                               onClick={e => this.handleRateCard(e, 1)}>1
                      </Button>
                       <Button className='bg-success m-2'
                                onClick={e => this.handleRateCard(e, 2)}>2
                       </Button>
                      <Button className='bg-warning m-2'
                              onClick={e => this.handleRateCard(e, 3)}>3
                      </Button>
                      <Button className='bg-orange m-2'
                              onClick={e => this.handleRateCard(e, 4)}>4
                      </Button>
                      <Button className='bg-danger m-2'
                              onClick={e => this.handleRateCard(e, 5)}>5
                      </Button>
                    </div>
                  )
                : (
                    <div className='text-center mt-2'>
                      <Button onClick={e => this.revealCard(e)}>
                        Reveal Answer
                      </Button>
                    </div>
                  )
            }

          </div>
        </div>
      </div>
    );
  }
}

export default StudyCards;
