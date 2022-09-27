import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary bg-light shadow fixed-top">
        <div className="container">
          <a className="navbar-brand text-primary font-open-sans-bold" href="#">
            Deck Study
          </a>
        </div>
        <div>
          <button className='btn btn-light text-primary border border-primary me-4 font-open-sans'>Sign Out</button>
        </div>
      </nav>
    );
  }
}
Navbar.contextType = AppContext;
