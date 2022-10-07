import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      index: null
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='text-center'>
              <h4 className='text-primary'>Welcome to Deck Study</h4>
              <p className='text-primary'>Landing Page Still in Development. Please Sign In or Sign Up to get started.</p>
              <img src="https://cdn.iconscout.com/icon/free/png-256/maintenance-services-wrench-setting-support-tools-25-8246.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
