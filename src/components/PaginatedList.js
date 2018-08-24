import React from 'react';
import MovieItem from '../components/MovieItem';
// import { fetchingSearchData } from '../actions/fetchingData';
import { Link } from 'react-router-dom';

class PaginatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list || [], // list to show
      listItem: this.props.listItem || null, // item list component
      pageSize: this.props.pageSize || 5, // number of items in page
      startingPage: 1,
      totalResults: this.props.totalResults || 0,
      currentPage: this.props.currentPage || 1,
      resultsFrom: this.props.currentPage ? this.props.currentPage * 5 - 4 : 0,
      resultsTo: this.props.currentPage ? this.props.currentPage * 5 : this.props.pageSize,
      maxPages: (this.props.totalResults % this.props.pageSize > 0) ?
        Math.floor(this.props.totalResults / this.props.pageSize) + 1 :
        Math.floor(this.props.totalResults / this.props.pageSize),
    };
  }
  componentWillMount() {
    console.log(this.props.match);
  }
  getPreviousePage() {
    return {
      pathname: '/pagination',
      search: '?s=fast&page=' + Number(this.state.currentPage - 1),
    };
  }
  getNextPage() {
    return {
      pathname: '/pagination',
      search: '?s=fast&page=' + Number(this.state.currentPage + 1),
    };
  }
  render() {
    let list = [];
    list = (this.props.list.map((movie) =>
      <this.state.listItem key={movie.imdbID} title={movie.Title} year={movie.Year} imdbID={movie.imdbID} poster={movie.Poster}></this.state.listItem>
    )).slice(0, 5);
    if (this.state.currentPage === this.state.maxPage) {
      console.log(this.state.resultsTo, this.state.totalResults)
      this.setState({ resultsTo: this.state.totalResults });
    }

    return (
      <div className="PaginatedList">
        {/* {this.props.list} */}
        {list}
        <label>PaginatedList Movie:</label>
        <br />
        {this.props.pageSize}
        <br />
        <br />
        Showing movies results: {this.state.resultsFrom} - {this.state.resultsTo} out of {this.state.totalResults}
        <br />
        <br />
        <Link to={this.getPreviousePage()}>previouse page</Link>
        current page: {this.state.currentPage}
        <Link to={this.getNextPage()}>next page</Link>

        <br />
        Total pages: {this.state.maxPages}
      </div>
    )
  }
}

export default PaginatedList;
