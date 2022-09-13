import React from 'react';
// import AppContext from './lib/app-context';
import ParseRoute from './lib/parse-route';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: ParseRoute(window.location.hash)
    };
  }

  renderPage() {
    return <Home />;
  }

  render() {
    return (
    <>
      <Navbar />
      <PageContainer>
        {this.renderPage()}
      </PageContainer>
    </>
    );
  }
}
