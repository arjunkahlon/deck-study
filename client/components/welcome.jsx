import React from 'react';
import Button from 'react-bootstrap/Button';

function Welcome(props) {

  return (
    <div>
      <div className='container landing-hero-container border border-primary p-5'>
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
      <div className='container landing-body-container bg-dark bg-gradient'>
        <p className='text-white text-end'>Deck Study</p>
      </div>
      <div className='container bg-primary-gradient border border-primary rounded mb-2 p-0'>
        <div className='text-center'>
          <h2 className='font-open-sans bg-dark bg-gradient p-2 text-white m-0'>Why Deck Study?</h2>
        </div>
        <div className='container bg-primary-gradient-left'>
          <div className='row'>
            <div className='col-lg-6 p-2'>
              <div className='text-center'>
                <h4 className='font-open-sans text-light bg-primary bg-gradient p-2 m-0'>Customizable Decks</h4>
                <p className='p-3 text-light font-open-sans bg-dark bg-gradient'>
                  Flash cards are an age-old learning tool that have reamined a staple in
                  classrooms across the world. By having student engage in active recall,
                  flash cards help form a lasting connection to the material. Deck Study provides
                  learners with an interactive interface to create, edit, and study flash cards from
                  any topic of their choice.
                </p>
              </div>
            </div>
            <div className='col-lg-6 p-2'>
              <div className='text-center'>
                <h4 className='font-open-sans text-light bg-danger bg-gradient p-2 m-0'>Spaced Repetition Study Algorithm</h4>
                <p className='p-3 text-light font-open-sans bg-dark bg-gradient'>
                  Our study algorithm is designed with the spaced repetition learning technique. When a user studies
                  a deck, they are prompted to rate the difficulty of each card after revealing the answer. Our algorithm
                  processes the deck into an arragement that presents new and difficult concepts first. This ensures that
                  students tackle their weaknesses when engaging with their course material.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Welcome;
