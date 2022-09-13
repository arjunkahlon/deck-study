import React from 'react';
import DeckList from '../components/deck-list';

class Decks extends React.Component {
  render() {
    const decks = [];
    return (
      <div className='row'>
        <div className='col-12 text-white bg-primary'>
          <h2>Course Decks</h2>
        </div>
        < DeckList decks={decks} />
      </div>
    );
  }
}

export default Decks;
