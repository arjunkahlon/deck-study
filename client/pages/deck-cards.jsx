import React from 'react';

class DeckCards extends React.Component {
  constructor(props) {
    super(props);
    // const deckId = this.props.deckId;

    this.state = ({
      cards: [],
      editMode: true
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>

          </div>
        </div>
      </div>
    );
  }
}

export default DeckCards;
