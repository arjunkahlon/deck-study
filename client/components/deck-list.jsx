import React from 'react';

export default function DeckList(props) {
  let deckListPrompt = '';
  props.decks.length === 0
    ? deckListPrompt = 'No Course Decks'
    : deckListPrompt = '';

  return (
    <div className='container bg-light p-1'>
      <div className='row'>
        <div className='col-12'>
          <div>
            <h4>{deckListPrompt}</h4>
            {props.decks.map((deck, index) => {
              return (
                <div key={index} className='border-bottom border-secondary p-5 pt-3'>
                 <div className='p-0'>
                    <h2 className='text-primary'>{deck.deckName}</h2>
                   </div>
               </div>
              );
            })}
          </div>
       </div>
      </div>
    </div>
  );
}
