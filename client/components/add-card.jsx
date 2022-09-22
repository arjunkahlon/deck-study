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
      <div className='mt-4'>
        <div className='row'>
          <div className='col md-6'>
            <Card className='shadow-lg'>
              <Card.Header className='bg-primary text-light text-center font-open-sans h5 p-3'>
                New Card
              </Card.Header>
              <Card.Body className=''>
                <div className='mt-3'>
                  <form onSubmit={event => this.props.handleAddCard(event, this.state.question, this.state.answer)}>
                    <div className='form-group'>
                      <div className='row'>
                        <div className='col-md-6 text-center'>
                          <label htmlFor="question" className='d-flex text-secondary mb-1'>Question:</label>
                          <div className='form-row'>
                            <div className='col-auto'>
                              <textarea id="question-input"
                                        className='add-input p-0'

                                        value={this.state.value}
                                        onChange={handleQuestionChange}>
                              </textarea>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 text-center'>
                          <label htmlFor='answer' className='d-flex text-secondary mb-1'>Answer:</label>
                          <div className='form-row'>
                            <div className='col-auto'>
                              <textarea id="answer-input"
                                        className='add-input p-0'
                                        cols="40"
                                        rows="8"
                                        value={this.state.value}
                                        onChange={handleAnswerChange}>
                              </textarea>
                            </div>
                          </div>
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
