import React from 'react';
import { Link } from 'react-router-dom';
import './MovieItem.css';

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
  render() {
    return (
      <div className="movie-item">
        <div className="poster-img">
          <Link to={`${this.props.imdbID}`} ><img className="poster" src={this.props.poster} alt={this.props.title} /></Link>
        </div>
        <div className="details">
          <h2>Movie Title: </h2>
            <h1><span className="text-style">{this.props.title}</span></h1>
          <h3>Year: <span className="text-style">{this.props.year}</span></h3>
        </div>
      </div>
    );
  }
}

export default MovieItem;
