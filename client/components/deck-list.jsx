import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default function DeckList(props) {
  if (props.decks.length === 0) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <button>
              <i className='fa fa-plus'></i>
              <span>Add a New Course</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

}
