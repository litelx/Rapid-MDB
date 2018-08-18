import React from 'react';
import MovieItem from '../components/MovieItem';

class PaginatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list || [], // list to show
      size: parseInt(this.props.size, 10) || 5, // number of items in page
      listItem: this.props.listItem || null, // item list component
      // startingPage: 1,
      totalResults: 0,
      currentPage: null,
      resultsFrom: this.props.match.params.page * 5 - 4,
      resultsTo: this.props.match.params.page * 5,
      pageCount: null,
    };
  }
  componentWillMount() {
    // const startingPage = 1;

    const keyAPI = 'f7f83581&s';
    const queryAPI = this.props.match.params.qsearchQuery;
    const page = Math.round(this.props.match.params.page / 2);
    const urlAPI = 'http://www.omdbapi.com/?apikey=' + keyAPI + '&s=' + queryAPI + '&page=' + page;

    fetch(urlAPI)
      .then(response => {
        if (response)
          return response.json()
      })
      .then(data => {
        if (data) {
          const division = parseInt(Number(data.totalResults) / this.state.size, 10);
          const modulo = parseInt(Number(data.totalResults) % this.state.size, 10) > 0;
          let pageCount = modulo ? division + 1 : division;
          this.setState({
            list: data.Search,
            currentPage: this.props.match.params.page || 1,
            pageCount: pageCount,
            totalResults: data.totalResults,
          })
        }

      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let list = [];
    if (this.state.currentPage % 2 > 0) {
      // get 5 first
      list = (this.state.list.map((movie) =>
        <MovieItem key={movie.imdbID} title={movie.Title} year={movie.Year} imdbID={movie.imdbID} poster={movie.Poster}></MovieItem>
      )).slice(0, 5);
    } else {
      // get last 5
      list = (this.state.list.map((movie) =>
        <MovieItem key={movie.imdbID} title={movie.Title} year={movie.Year} imdbID={movie.imdbID} poster={movie.Poster}></MovieItem>
      )).slice(5);
    }

    return (
      <div className="PaginatedList">
        <label>PaginatedList Movie:</label>
        {list}
        <br />
        {this.state.size}
        <br />
        <br />
        Showing movies results: {this.state.resultsFrom} - {this.state.resultsTo} out of {this.state.totalResults}
        <br />
        <br />
        current page: {this.state.currentPage}
        <br />
        Total pages: {this.state.pageCount}
      </div>
    )
  }
}

export default PaginatedList;
