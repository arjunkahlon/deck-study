import React from 'react';

function NetworkError(props) {
  const { message } = props;
  return (
    <div className='container'>
      <div className='row'>
        <div className='col bg-danger'>
          <h2 className='font-open-sans text-center text-light p-2'>Network Error</h2>
        </div>
      </div>
      <div className='row center ps-2 pe-2 pt-4'>
        <div className='col bg-danger p-2'>
          <div className='container bg-light text-center rounded p-4'>
            <i className="bi bi-exclamation-triangle-fill text-danger h1"></i>

            <h4 className='text-danger'>Sorry, something went wrong.</h4>
            <h5>Response from server:</h5>
            <p className='text-secondary'>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkError;
