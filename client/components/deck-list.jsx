import React from 'react';
import EmptyPrompt from './empty-prompt';

function DeckList(props) {

  if (props.decks.length === 0) {
    return (
      <EmptyPrompt prompt="No Decks" />
    );
  }
  return (
    <div className='container bg-light p-1'>
      <div className='row'>
        <div className='col-12'>
          <div className=''>
            {props.decks.map((deck, index) => {
              return (
                <div key={deck.deckId} className='border-bottom ps-5 pt-3'>
                  <div className='p-0'>
                    <div className='row'>
                      <div className='col-sm-8'>
                        <a href={`#deck-cards?deckId=${deck.deckId}&tab=browse&cardIndex=${0}`}>
                          <h2 className='deck-name text-primary font-open-sans'>{deck.deckName}</h2>
                        </a>
                      </div>
                      <div className='col-sm-4 align-self-end'>
                        <div className='row'>
                          <div className='col-sm-8 text-end'>
                            <div className='row'>
                              <div className='col-sm-12 mt-2 mb-2'>
                                <a href={`#deck-cards?deckId=${deck.deckId}&tab=edit&cardIndex=${0}`}>
                                  <i className='deck-icon bi bi-pencil text-primary lead fs-1 m-4 p-2'>
                                    <h5 className='ps-1 d-inline'>Edit</h5>
                                  </i>
                                </a>
                              <div className='col-sm-12 mt-2 mb-2'>
                                <a href={`#study-cards?deckId=${deck.deckId}`}>
                                  <i className='deck-icon bi bi-book text-primary lead fs-1 m-2 p-2'>
                                    <h5 className=' ps-1 d-inline'>Study</h5>
                                  </i>
                                  </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default DeckList;
