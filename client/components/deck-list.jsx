import React from 'react';
import EmptyPrompt from './empty-prompt';

function DeckList(props) {

  if (props.decks.length) {
    return (
      <div className='container bg-light p-1'>
        <div className='row'>
          <div className='col-12'>
            <div>
              {props.decks.map((deck, index) => {
                return (
                  <div key={deck.deckId} className='border-bottom border-secondary p-5 pt-3'>
                    <div className='p-0'>
                      <div className='row'>
                        <div className='col-sm-8'>
                          <h2 className='text-primary font-open-sans'>{deck.deckName}</h2>
                        </div>
                        <div className='col-sm-4 align-self-end'>
                          <div className='row'>
                            <div className='col-sm-8 text-end'>
                              <div>
                                <a href={`#deck-cards?deckId=${deck.deckId}`}>
                                  <i className='bi bi-pencil text-primary lead fs-1 m-2'></i>
                                </a>
                                <a href="">
                                  <i className='bi bi-book text-primary lead fs-1 m-2'></i>
                                </a>
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
  } else {
    return (
      <EmptyPrompt prompt="No Decks."/>
    );
  }

}

export default DeckList;
