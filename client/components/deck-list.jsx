import React from 'react';

export default function DeckList(props) {
  let deckListPrompt = '';
  props.decks.length === 0
    ? deckListPrompt = 'No Course Decks'
    : deckListPrompt = 'Course Decks';

  return (
    <div className='container bg-light decks-list-container'>
      <div className='row'>
        <div className='col-12'>
          <div>
            <h4>{deckListPrompt}</h4>
          </div>
       </div>
      </div>
    </div>

  );
}
