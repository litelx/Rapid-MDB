import React from 'react';
import { fetchingMovieData } from '../actions/fetchingData';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdbID: this.props.match.params['imdbID'],
      movieDetails: {}
    };
  }
  componentWillMount() {
    const propertiesToOmit = ['imdbID', 'Type', 'DVD', 'BoxOffice', 'Response',];
    let temp = fetchingMovieData(this.state.imdbID);

    temp.then(res => {
      propertiesToOmit.map(prop => delete res[prop] );
      this.setState({ movieDetails: res });
    })
  }
  render() {
    console.log('Movie component');
    console.log(this);

    return (
      <div className="movie">
        <h1>IMG</h1>
        <h2>Movie title:</h2>
      </div>
    )
  }
}

export default Movie;
