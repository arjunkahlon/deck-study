import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

class AuthPage extends React.Component {

  render() {

    const { user, route } = this.context;

    if (user) return <Redirect to="" />;

    const userPrompt = route.path === 'sign-in'
      ? 'Log In'
      : 'Create an Account';

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <header className='text-center'>
              <h2 className='mb-2 bg-primary text-light'>
                <i className='fas fa-bolt me-2s' />
                Welcome to Deck Study
              </h2>
              <p className='font-open-sans text-muted mb-4'>{ userPrompt }</p>
            </header>
          </div>
            <AuthForm
              key={route.path}
              action={route.path}/>
        </div>
      </div>
    );

  }
}

export default AuthPage;

AuthPage.contextType = AppContext;
