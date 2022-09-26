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
      studiedCards: [],
      cardDrawn: false,
      cardRevealed: false,
      index: null
    });

    this.difficultyTheme = ['bg-blue', 'bg-success', 'bg-warning', 'bg-orange', 'bg-danger'];

    this.drawCard = this.drawCard.bind(this);
    this.revealCard = this.revealCard.bind(this);
  }

  drawCard() {
    const cardsCopy = [...this.state.cards];

    const currentIndex = this.state.index;
    let newIndex = null;

    if (currentIndex === cardsCopy.length) {
      newIndex = 0;
      const studiedCardsCopy = [...this.state.studiedCards];
      const shuffledCards = shuffleDeck(studiedCardsCopy);

      this.setState({
        cards: shuffledCards,
        studiedCards: [],
        index: newIndex
      });
    } else {
      newIndex = currentIndex + 1;
      const newCard = cardsCopy[currentIndex];

      this.setState({
        card: newCard,
        cardDrawn: true,
        index: newIndex
      });
    }

  }

  revealCard(e) {
    this.setState({
      cardRevealed: true
    });
  }

  handleRateCard(e, difficulty) {
    this.setState({
      cardDrawn: false
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
          const studiedCardsCopy = [...this.state.studiedCards, result];
          this.setState({
            studiedCards: studiedCardsCopy,
            cardDrawn: false,
            cardRevealed: false
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
          index: 0,
          cardDrawn: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (!this.state.cardDrawn) {
      return (
        <LoadSpinner />
      );
    }

    return (
      <div className='container mt-4'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <Card className='shadow-lg mb-5 bg-white rounded' style={{ height: '25rem' }}>
              <Card.Header ref={this.selectorRef} className={`${this.difficultyTheme[this.state.card.difficulty - 1]} pb-0 pe-3 rounded`}>
                <div className='row justify-content-end'>
                  <div className='col text-end'>
                    <h5 className='font-open-sans text-white'>{this.state.deck.deckName}</h5>
                  </div>
                </div>
              </Card.Header>
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
                              <p className='font-open-sanstext-secondary mt-3'>{this.state.card.question}</p>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col border-bottom border-secondary pt-1'>

                            </div>
                          </div>
                          <div className='row'>
                            <div className='col'>
                            <h5 className='text-secondary font-weight-bold mt-5'>A</h5>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col text-center'>
                              <p className='font-open-sans font-weight-bold'>{this.state.card.answer}</p>
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
                              <p className='font-open-sans'>{this.state.card.question}</p>
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
                    <div>
                      <div className='row'>
                        <div className='col text-center'>
                          <p className='text-secondary'>How difficult did you find this question?</p>
                        </div>
                      </div>
                      <div className='row justify-content-center'>
                        <div className='col-lg-auto mt-2 text-center'>
                          {
                            this.difficultyTheme.map((difficultyColor, index) => {
                              return (
                                <Button key={index} className={`${difficultyColor} rounded-circle m-2 shadow-lg border-0`}
                                  size='lg'
                                  onClick={e => this.handleRateCard(e, index + 1)}>{index + 1}</Button>
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>
                  )
                : (
                    <div className='row justify-content-center'>
                    <div className='col-md-4 text-center mt-2 d-grid gap-2'>
                        <Button variant='primary'
                                size='lg'
                                className={`${this.difficultyTheme[this.state.card.difficulty - 1]} shadow-lg border-0 font-open-sans`}
                                onClick={e => this.revealCard(e)}>
                          Reveal Answer
                        </Button>
                      </div>
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
