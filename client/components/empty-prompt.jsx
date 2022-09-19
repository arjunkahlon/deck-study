import React from 'react';

function EmptyPrompt(props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='text-center mt-4'>
            <h5 className='font-open-sans text-secondary'>{props.prompt}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyPrompt;
