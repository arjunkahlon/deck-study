import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-light">
        <div className="container">
          <a className="navbar-brand text-primary" href="#">
            Deck Study
          </a>
        </div>
      </nav>
    );
  }
}
Navbar.contextType = AppContext;
