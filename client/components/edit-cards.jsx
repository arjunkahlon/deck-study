import React from 'react';
import Card from 'react-bootstrap/Card';
import AddCard from './add-card';
import Button from 'react-bootstrap/Button';
import EmptyPrompt from './empty-prompt';

class EditCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      addMode: false,
      isUpdating: false,
      question: '',
      answer: ''
    });
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.toggleAddMode = this.toggleAddMode.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleQuestionChange(event) {
    this.setState({
      question: event.target.value
    });

  }

  handleAnswerChange(event) {
    this.setState({
      answer: event.target.value
    });
  }

  toggleAddMode(question, answer) {
    this.setState({
      addMode: !this.state.addMode
    });
  }

  handleEditCard(event) {
    event.preventDefault();
    this.setState({
      isUpdating: true
    });
    const { question, answer } = this.state;
    const cardId = this.props.deck.cards[this.props.cardIndex].cardId;
    if (question && answer) {
      const reqBody = {};
      reqBody.question = question;
      reqBody.answer = answer;

      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${this.props.token}`
        },
        body: JSON.stringify(reqBody)
      };

      fetch(`/api/card/${cardId}`, req)
        .then(res => res.json())
        .then(result => {
          this.props.handleEditCard(result);
          this.setState({
            isUpdating: false
          });
        });
    }
  }

  handleAddCard(event, question, answer) {
    event.preventDefault();
    if (question && answer) {
      const reqBody = {};
      reqBody.deckId = this.props.deckId;
      reqBody.question = question;
      reqBody.answer = answer;

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${this.props.token}`
        },
        body: JSON.stringify(reqBody)
      };

      fetch('/api/card', req)
        .then(res => res.json())
        .then(result => {
          this.props.handleAddCard(result);
        })
        .then(
          this.toggleAddMode
        );
    }
  }

  componentDidMount() {
    if (this.props.deckLength > 0) {
      this.setState({
        question: this.props.deck.cards[this.props.cardIndex].question,
        answer: this.props.deck.cards[this.props.cardIndex].answer
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cardIndex !== prevProps.cardIndex) {
      this.setState({
        question: this.props.deck.cards[this.props.cardIndex].question,
        answer: this.props.deck.cards[this.props.cardIndex].answer
      });
    }
  }

  render() {
    const { handleAddCard, toggleAddMode } = this;

    if (this.state.addMode) {
      return (
        <div className='row'>
          <div className='col'>
            <AddCard deckId={this.props.deckId}
              handleAddCard={handleAddCard}
              toggleAddMode={toggleAddMode}
              route={this.props.route} />
          </div>
        </div>
      );
    }

    if (this.props.deckLength === 0) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='d-grid gap-z mt-4'>
                <Button variant='outline-secondary'
                        size='lg'
                        className='font-open-sans'
                        onClick={this.toggleAddMode}>Add Card</Button>
              </div>
            </div>
          </div>
          <EmptyPrompt prompt="No Cards in Deck" />
        </div>
      );
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col mt-3 text-end'>
            <a href={`#${this.props.route.path}?deckId=${this.props.deck.deckId}&tab=edit&cardIndex=${((this.props.cardIndex - 1) + (this.props.deckLength)) % (this.props.deckLength)}`}>
              <i className='bi bi-chevron-left text-light lead fs-1 bg-primary rounded' />
            </a>
          </div>
          <div className='col-6'>
            <div className='d-grid gap-z mt-4'>
              <Button variant='outline-secondary'
                      size='lg'
                      className='font-open-sans'
                      onClick={this.toggleAddMode}>Add Card</Button>
            </div>
          </div>
          <div className='col mt-3'>
            <a href={`#${this.props.route.path}?deckId=${this.props.deck.deckId}&tab=edit&cardIndex=${((this.props.cardIndex + 1) % (this.props.deckLength))}`}>
              <i className='bi bi-chevron-right text-light lead fs-1 bg-primary rounded' />
            </a>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='overflow-auto shadow-lg'>
              <Card className>
                <Card.Header className='bg-primary text-light text-center font-open-sans h5 p-3'>
                  Edit Card {this.props.cardIndex + 1} of {this.props.deckLength}
                </Card.Header>
                <Card.Body className=''>
                  <div className='mt-3'>
                    <form onSubmit={this.handleEditCard}>
                      <div className='form-group'>
                        <div className='row'>
                          <div className='col-md-6 text-center'>
                            <label htmlFor="question" className='d-flex text-secondary mb-1'>Question:</label>
                            <div className='form-row'>
                              <div className='col-auto'>
                                <textarea id="question-input"
                                  onChange={this.handleQuestionChange}
                                  className='add-input p-2'
                                  value={this.state.question}>
                                </textarea>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6 text-center'>
                            <label htmlFor='answer' className='d-flex text-secondary mb-1'>Answer:</label>
                            <div className='form-row'>
                              <div className='col-auto'>
                                <textarea id="answer-input"
                                  className='add-input p-2'
                                  onChange={this.handleAnswerChange}
                                  value= {this.state.answer}>
                                </textarea>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col text-end mt-5'>
                              <Button variant='danger'
                                className='m-2'>Delete
                              </Button>
                              <Button variant='primary'
                                type="submit"
                                value="Submit"
                                className='m-2'>
                                  {this.state.isUpdating
                                    ? (
                                    <div>
                                      <span className='spinner-border spinner-border-sm me-1'
                                        role='status'
                                        aria-hidden='true'>
                                      </span>
                                      <span className='sr-only'>
                                        Updating
                                      </span>
                                    </div>
                                      )
                                    : (
                                    <span className='sr-only'>
                                      Update
                                    </span>
                                      )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCards;
