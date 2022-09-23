import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadSpinner() {
  return (
    <div className='row'>
      <div className='col'>
        <div className='container text-center'>
          <div className='mt-4'>
            <Spinner animation="border"
              variant="primary"
              style={{ width: '5rem', height: '5rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadSpinner;
