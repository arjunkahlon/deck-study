import React from 'react';
import Home from './pages/home';
import DeckCards from './pages/deck-cards';
import Navbar from './components/navbar';
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
    const { route } = this.state;

    if (route.path === '') {
      return <Home />;
    }

    if (route.path === 'deck-cards') {
      const deckId = route.params.get('deckId');
      const tab = route.params.get('tab');
      const cardIndex = parseInt(route.params.get('cardIndex') ?? '0');

      return <DeckCards deckId={deckId} tab={tab} cardIndex={cardIndex}/>;
    }
  }

  render() {
    const { route } = this.state;
    const contextValue = { route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          <PageContainer>
            {this.renderPage()}
          </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
