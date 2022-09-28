import React from 'react';
import Home from './pages/home';
import AuthPage from './pages/auth';
import DeckCards from './pages/deck-cards';
import StudyCards from './pages/study-cards';
import Navigation from './components/navbar';
import PageContainer from './components/page-container';
import 'bootstrap-icons/font/bootstrap-icons.css';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { user, route } = this.state;

    if (route.path === '') {
      return <Home user={user}/>;
    }

    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <AuthPage />;
    }

    if (route.path === 'deck-cards') {
      const deckId = route.params.get('deckId');
      const tab = route.params.get('tab');
      const cardIndex = parseInt(route.params.get('cardIndex') ?? '0');

      return <DeckCards deckId={deckId} tab={tab} cardIndex={cardIndex}/>;
    }

    if (route.path === 'study-cards') {
      const deckId = route.params.get('deckId');
      return <StudyCards deckId={deckId} />;
    }
  }

  render() {
    const { user, route } = this.state;
    const contextValue = { user, route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navigation />
          <PageContainer>
            {this.renderPage()}
          </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
