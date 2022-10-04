import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

class AuthPage extends React.Component {

  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const userHeader = route.path === 'sign-in'
      ? 'Welcome Back!'
      : 'Welcome New User!';

    const userPrompt = route.path === 'sign-in'
      ? 'Sign In'
      : 'Create an Account';

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <header className='text-center bg-primary bg-gradient p-3 rounded'>
              <h2 className='text-light font-open-sans'>
                {userHeader}
              </h2>
            </header>
          </div>
        </div>
        <div className='container bg-light p-3 rounded'>
          <div className='row'>
            <div className='col text-center'>
              <p className='font-open-sans text-primary h5 mb-4'>
                {userPrompt}
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col mb-5'>
              <AuthForm
                key={route.path}
                action={route.path}
                onSignIn={handleSignIn}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthPage;

AuthPage.contextType = AppContext;
