import React from "react";
import { fetchingMovieData } from "../actions/fetchingData";
import "./Movie.css";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdbID: this.props.match.params["imdbID"],
      movieDetails: {},
      movieImage: "",
      movieTitle: "",
      ratings: []
    };
  }
  componentWillMount() {
    const propertiesToOmit = [
      "imdbID",
      "Type",
      "DVD",
      "BoxOffice",
      "Response",
      "Title",
      "Poster",
      "Ratings"
    ];
    let fetchedData = fetchingMovieData(this.state.imdbID);

    fetchedData.then(res => {
      if (res.Response === "False") {
        this.movie = false;
      } else {
        this.movie = true;
        this.setState({ movieTitle: res["Title"] });
        this.setState({ movieImage: res["Poster"] });
        this.setState({ ratings: res["Ratings"] });
        propertiesToOmit.map(prop => delete res[prop]);
        this.setState({ movieDetails: res });
      }
    });
  }
  render() {
    const movieDetails = { ...this.state.movieDetails };
    let keys = Object.keys(movieDetails);
    const allDetails = keys.map((e, i) => (
      <div key={i}>
        <span className="detail-title">{`${e}: `}</span>
        <span>{`${movieDetails[e]}`}</span>
      </div>
    ));
    let ratings = [...this.state.ratings];
    const allRatings = ratings.map((e, i) => (
      <div key={i}>
        <span className="detail-title">{`${e.Source}: `}</span>
        <span>{`${e.Value}`}</span>
      </div>
    ));

    return (
      <div className="movie">
        {!this.movie ? (
          <div className="movie-details">
            <h1>No results</h1>
          </div>
        ) : (
          <div>
            <div className="movie-img">
              <img src={this.state.movieImage} alt={this.state.movieTitle} />
            </div>
            <div className="movie-details">
              <h1>{this.state.movieTitle}</h1>
              {allDetails}
              <br />
              <h4>Ratings:</h4>
              {allRatings}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Movie;
