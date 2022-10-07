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
                <div key={deck.deckId} className='deck-entry border-bottom ps-5 pt-3'>
                  <div className='p-0'>
                    <div className='row'>
                      <div className='col-sm-8'>
                        <a href={`#deck-cards?deckId=${deck.deckId}&tab=browse&cardIndex=${0}`}>
                          <div className='p-2 pb-4'>
                            <h2 className='deck-name text-primary font-open-sans'>{deck.deckName}</h2>
                          </div>
                        </a>
                      </div>
                      <div className='col-sm-4 align-self-end'>
                        <div className='row'>
                          <div className='col-sm-8 text-end'>
                            <div className='row'>
                              <div className='col-sm-12 mt-2 mb-2'>
                                <a href={`#deck-cards?deckId=${deck.deckId}&tab=edit&cardIndex=${0}`} className='p-3'>
                                  <i className='deck-icon bi bi-pencil text-primary p-2'>
                                    <h5 className='ps-1 d-inline-block'>Edit</h5>
                                  </i>
                                </a>
                              <div className='col-sm-12 mt-2 mb-2'>
                                <a href={`#study-cards?deckId=${deck.deckId}`}>
                                  <i className='deck-icon bi bi-book text-primary p-2'>
                                    <h5 className=' ps-1 d-inline-block'>Study</h5>
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
