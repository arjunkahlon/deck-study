import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => {
        const { handleNetworkError } = this.context;
        handleNetworkError(err);
      });
  }

  handleDemo(event) {
    if (this.props.action === 'sign-in') {
      this.setState({
        username: 'demo',
        password: 'password1'
      });
    } else {
      window.location.hash = 'sign-in';
    }
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;

    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';

    const alternatActionText = action === 'sign-up'
      ? 'Already have an account?'
      : 'Create an account?';

    const submitButtonText = action === 'sign-up'
      ? 'Sign Up'
      : 'Sign In';

    const demoText = action === 'sign-up'
      ? 'Sign In With Demo Account Instead'
      : 'Demo Account';

    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-4'>
            <form className="w-100" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  required
                  autoFocus
                  id="username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={handleChange}
                  className="form-control bg-light" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  required
                  id="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={handleChange}
                  className="form-control bg-light" />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <small>
                  <a className="text-muted" href={alternateActionHref}>
                    {alternatActionText}
                  </a>
                </small>
                <button type="submit" className="btn btn-primary bg-gradient">
                  {submitButtonText}
                </button>
              </div>
            </form>
            <div className='text-center mt-4'>
              <button className="btn btn-outline-secondary"
                      onClick={this.handleDemo}>
                {demoText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
