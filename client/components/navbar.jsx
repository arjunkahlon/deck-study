import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import AppContext from '../lib/app-context';

export default class Navigation extends React.Component {
  render() {
    const { user } = this.context;
    return (
      <Navbar variant='light' bg='light' fixed='top'>
        <Navbar.Brand className='ms-4'>
          <a className="navbar-brand text-primary font-open-sans-bold" href="#">
             Deck Study
          </a>
        </Navbar.Brand>
        <Nav className='justify-content-end flex-grow-1'>
          <div>
            {user !== null &&
              <Button id='sign-out-button' className='bg-light text-primary border border-primary me-2'>
                Sign Out
              </Button>
            }
            {user === null &&
              <>
                <a href="#sign-in" className="d-inline">
                  <Button id='sign-in-button' className='bg-light text-primary border border-primary me-2'>
                    Sign In</Button>
                </a>
                <a href="#sign-up" className="d-inline">
                  <Button id='sign-up-button' className='bg-orange border border-none me-2'>
                    Get Started</Button>
                </a>
              </>
            }
          </div>
        </Nav>
      </Navbar>
    );
  }
}
Navigation.contextType = AppContext;
