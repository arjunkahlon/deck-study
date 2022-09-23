import React from 'react';
import LoadSpinner from '../components/loading-spinner';

class StudyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      deck: null,
      isLoading: true
    });
  }

  componentDidMount() {
    fetch(`/api/decks/${this.props.deckId}?sortBy=difficulty`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          deck: data,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadSpinner />
      );
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>

          </div>
        </div>
      </div>
    );
  }
}

export default StudyCards;
