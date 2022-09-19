import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      question: '',
      answer: ''
    });
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

  render() {
    const { handleAnswerChange, handleQuestionChange } = this;
    return (
      <div className='container d-flex justify-content-center mt-4'>
        <div className='row'>
          <div className='col'>
            <Card>
              <Card.Header className='bg-primary text-light text-center p-3'>
                Add Card
              </Card.Header>
              <Card.Body>
                <div className='mt-3'>
                  <form onSubmit={event => this.props.handleAddCard(event, this.state.question, this.state.answer)}>
                    <div className='row'>
                      <div className='col text-center'>
                        <label htmlFor="question" className='d-block text-secondary'>Question</label>
                        <textarea id="question-input"
                                  cols="35"
                                  rows="5"
                                  value={this.state.value}
                                  onChange={handleQuestionChange}>
                        </textarea>
                      </div>
                      <div className='col text-center'>
                        <label htmlFor='answer' className='d-block text-secondary'>Answer</label>
                        <textarea id="answer-input"
                                  cols="35"
                                  rows="5"
                                  value={this.state.value}
                                  onChange={handleAnswerChange}>
                        </textarea>
                      </div>
                      <div className='row'>
                        <div className='col text-end mt-5'>
                          <Button variant='secondary'
                                  onClick={this.props.toggleAddMode}
                                  className='m-2'>Cancel
                          </Button>
                          <Button variant='primary'
                                  type="submit"
                                  value="Submit"
                                  className='m-2'>Add Card
                          </Button>
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
    );
  }
}

export default AddCard;
