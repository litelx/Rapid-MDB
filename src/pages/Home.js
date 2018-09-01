import React from "react";

import _ from "lodash";
import Search from "../components/Search";
import PaginatedList from "../components/PaginatedList";
import { Route } from "react-router-dom";
import { fetchingSearchData } from "../actions/fetchingData";
import MovieItem from "../components/MovieItem";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      pageSize: 5,
      totalResults: 0
    };
  }
  componentWillMount() {
    if (
      this.props.history.location.pathname === "/" &&
      this.props.history.location.search.indexOf("?q=") === 0
    ) {
      const term = this.props.history.location.search.substring(3);
      this.movieSearch(term);
    }
    if (this.props.location.pathname.indexOf("pagination") !== -1) {
      let params = this.props.location.search.split("&page=");
      const term =
        params[0].indexOf("?s=") !== -1 ? params[0].substring(3) : null;
      const page = Number(params[1]);
      if (page > 0 && term) {
        this.movieSearch(term, page);
      }
    } else {
      this.props.history.push({
        pathname: `/`
      });
    }
  }
  movieSearch(term, page) {
    let results = fetchingSearchData(term, this.getApiPage(page));
    if (!results) return;
    results.then(res => {
      this.movies = res.Search;
      this.setState({ totalResults: res.totalResults });
      this.setState({ term: term });
      this.props.history.push({
        pathname: `/pagination`,
        search: `s=${term}&page=${this.getPage()}`
      });
    });
  }
  pagesList(term, page) {
    let results = fetchingSearchData(term, page);
    if (!results) return;
    results.then(res => {
      this.movies = res.Search;
    });
  }
  getPage() {
    const elemnt = this.props.history.location.search;
    if (elemnt.indexOf("&page=") !== -1) {
      const pageNumber = elemnt.substring(elemnt.indexOf("&page=") + 6);
      if (!isNaN(pageNumber)) {
        return Number(pageNumber);
      }
    }
    return 1;
  }
  getApiPage(page) {
    const currentPage = Number(page);
    return parseInt((currentPage + 1) / 2, 10);
  }
  createUpdate(movieList) {
    let updatedResults = {};

    if (movieList) {
      let list = movieList.map(movie => (
        <MovieItem
          key={movie.imdbID}
          title={movie.Title}
          year={movie.Year}
          imdbID={movie.imdbID}
          poster={movie.Poster}
        />
      ));
      updatedResults["resultsFrom"] = Number(
        this.getApiPage(this.getPage()) * 10 - 9
      );
      updatedResults["moviesListItems"] = list;
    }
    return updatedResults;
  }
  render() {
    const movieSearch = _.debounce(term => this.movieSearch(term, 1), 300);
    const fetchNewListItems = page => {
      this.pagesList(this.state.term, this.getApiPage(page));
    };
    let updatedResults = this.createUpdate(this.movies);

    return (
      <div className="list-item">
        <header className="App-header">
          <div className="tooltip">
            <a href="https://github.com/litelx/Rapid-MDB" target="_blank">
              <img className="git" src="https://www.appnovation.com/sites/default/files/2016-12/github.png"
                alt="Git"
              />
            </a>
            <span className="tooltiptext">Link to repository on GitHub</span>
          </div>

          <h1 className="App-title">Welcome to Rapid-MDB</h1>
          <Search onSearchTermChange={movieSearch} suggestList={this.movies} />
        </header>

        <Route
          path="/pagination"
          render={routeProps => (
            <PaginatedList
              {...routeProps}
              currentPage={this.getPage()}
              term={this.state.term}
              totalResults={this.state.totalResults}
              pageSize={this.state.pageSize}
              updatedResults={updatedResults}
              onSearchLinkChange={fetchNewListItems}
            />
          )}
        />
        <div />
      </div>
    );
  }
}

export default Home;
