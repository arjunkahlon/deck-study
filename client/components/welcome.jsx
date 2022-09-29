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
        <div className='row justify-content-center'>
          <div className='col-6'>
            <h2>Placeholder for Welcome Screen</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
