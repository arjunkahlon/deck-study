import React from 'react';
import Welcome from '../components/welcome';
import Decks from '../pages/decks';
import AppContext from '../lib/app-context';

function Home(props) {
  const { user } = props;

  if (!user) {
    return <Welcome />;
  }
  return (
    <div className='m-1'>
      <Decks />
    </div>
  );
}

export default Home;
Home.contextType = AppContext;
