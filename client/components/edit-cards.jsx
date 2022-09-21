import React from 'react';
import AddCard from './add-card';
import Button from 'react-bootstrap/Button';

class EditCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      addMode: false
    });
    this.handleAddCard = this.handleAddCard.bind(this);
    this.toggleAddMode = this.toggleAddMode.bind(this);
  }

  toggleAddMode() {
    this.setState({
      addMode: !this.state.addMode
    });
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
          'Content-Type': 'application/json'
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

  render() {
    const { handleAddCard, toggleAddMode } = this;
    if (!this.state.addMode) {
      return (
        <div className='d-grid gap-z mt-4'>
          <Button variant='outline-secondary'
                  size='lg'
                  className='font-open-sans'
                  onClick={this.toggleAddMode}>Add Card</Button>
        </div>
      );
    } else {
      return (
        <div className='row'>
          <div className='col'>
            <AddCard deckId={this.props.deckId}
                     handleAddCard={handleAddCard}
                     toggleAddMode={toggleAddMode}/>
          </div>
        </div>
      );
    }
  }
}

export default EditCards;
