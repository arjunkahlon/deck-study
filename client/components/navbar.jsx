import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            Deck Study
          </a>
        </div>
      </nav>
    );
  }
}
Navbar.contextType = AppContext;
