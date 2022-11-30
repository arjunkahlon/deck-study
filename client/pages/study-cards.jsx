import React from 'react';
import LoadSpinner from '../components/loading-spinner';
import shuffleDeck from '../lib/shuffle-deck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EmptyPrompt from '../components/empty-prompt';

class StudyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      deck: null,
      cards: null,
      index: null,
      studiedCards: [],
      isLoading: true,
      cardRevealed: false
    });

    this.difficultyTheme = ['bg-blue', 'bg-success', 'bg-warning', 'bg-orange', 'bg-danger'];
    this.revealCard = this.revealCard.bind(this);
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
    const cardId = this.state.cards[this.state.index].cardId;

    if (difficulty) {
      const reqBody = {};
      reqBody.difficulty = difficulty;

      const req = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${this.props.token}`
        },
        body: JSON.stringify(reqBody)
      };

      fetch(`/api/card/difficulty/${cardId}`, req)
        .then(res => res.json())
        .then(result => {
          const studiedCardsCopy = [...this.state.studiedCards, result];
          const currentIndex = this.state.index;
          let newIndex = null;

          if (this.state.index === this.state.cards.length - 1) {
            newIndex = 0;
            const shuffledCards = shuffleDeck(studiedCardsCopy);

            this.setState({
              cards: shuffledCards,
              index: newIndex,
              studiedCards: [],
              isLoading: false,
              cardRevealed: false
            });
          } else {
            newIndex = currentIndex + 1;

            this.setState({
              index: newIndex,
              studiedCards: studiedCardsCopy,
              isLoading: false,
              cardRevealed: false
            });
          }
        })
        .catch(err => {
          const { handleNetworkError } = this.context;
          handleNetworkError(err);
        });
    }
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${this.props.token}`
      }
    };

    fetch(`/api/decks/${this.props.deckId}?sortBy=difficulty`, req)
      .then(res => res.json())
      .then(data => {
        const shuffledCards = shuffleDeck(data.cards);
        this.setState({
          deck: data,
          cards: shuffledCards,
          index: 0,
          isLoading: false
        });
      })
      .catch(err => {
        const { handleNetworkError } = this.context;
        handleNetworkError(err);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadSpinner />
      );
    }

    if (this.state.cards.length === 0) {
      return (
        <EmptyPrompt prompt="No Cards in Deck" />
      );
    }

    return (
      <div className='container mt-4'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <Card className='shadow-lg mb-5 bg-white rounded' style={{ height: '25rem' }}>
              <Card.Header className={`${this.difficultyTheme[this.state.cards[this.state.index].difficulty - 1]} study-header pb-0 pe-3 rounded`}>
                <div className='row justify-content-end'>
                  <div className='col text-end'>
                    <h5 className='font-open-sans text-white'>{this.state.deck.deckName}</h5>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className='overflow-auto'>
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
                              <p className='font-open-sanstext-secondary mt-3'>{this.state.cards[this.state.index].question}</p>
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
                            <p className='font-open-sans font-weight-bold'>{this.state.cards[this.state.index].answer}</p>
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
                            <p className='font-open-sans'>{this.state.cards[this.state.index].question}</p>
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
                                <Button key={index} className={`${difficultyColor} rounded-circle rtng-circle m-2 shadow-lg border-0`}
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
                                className={`${this.difficultyTheme[this.state.cards[this.state.index].difficulty - 1]} rtng-button shadow-lg border-0 font-open-sans`}
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
