import React from 'react';
import Button from 'react-bootstrap/Button';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      index: null
    });
  }

  render() {
    return (
      <div>
        <div className='container landing-hero-container p-5'>
          <div className='row'>
            <div className='col pt-2'>
              <h1 className='text-light text-center font-open-sans'>Create, Study, Learn</h1>
              <div className='pt-4'>
                <p className='text-white text-center font-open-sans'>
                  Flash cards remain a tried-and-tested method to improve
                  memory recall.
                </p>
              </div>
              <div className='pt-2 text-center'>
                <h5 className='text-white'>Let&#39;s Get Studying</h5>
              </div>
              <div className='pt-4'>
                <a href="#sign-up">
                  <div className='text-center'>
                    <Button className='bg-orange'>
                      Get Started
                    </Button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='container landing-body-container bg-dark'>
          <p className='text-white text-end'>Deck Study</p>
        </div>
        <div className='container bg-light border border-dark rounded'>
          <div className='text-center mb-5'>
            <h2 className='font-open-sans'>What We Offer</h2>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='text-center'>
                <h4 className='font-open-sans'>Card Creation</h4>
              </div>
            </div>
            <div className='col'>
              <div className='text-center'>
                <h4 className='font-open-sans'>Study Algorithm</h4>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }

}
export default Welcome;
