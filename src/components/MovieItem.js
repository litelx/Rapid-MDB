import React from 'react';
import { Link } from 'react-router-dom';

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      year: '',
      imdbID: '',
      poster: ''
    };
  }
  routeToMovie(id) {
  }
  render() {

    return (
      <div className="list-item">
        <img className="poster" src={this.props.poster} alt={this.props.title} />
        <h1>{this.props.title}</h1>
        <h1>{this.props.year}</h1>
        <Link to={`${this.props.imdbID}`} >{this.props.imdbID}</Link>
      </div>
    );
  }
}

export default MovieItem;
