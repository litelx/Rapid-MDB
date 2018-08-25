import React from 'react';
import { Link } from 'react-router-dom';

class PaginatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {}, // => Dictionary -> key: page, value: list size of pageSize
      pageSize: this.props.pageSize || 5, // number of items in page
      term: this.props.term,
      totalResults: this.props.totalResults || 0,
      listItem: this.props.listItem || null, // item list component
      currentPage: this.props.currentPage || 1,
      list: this.props.list || [], // list to add to pages map


    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({ currentPage: nextProps.currentPage });
    }
  }
  getPreviousePage() {

    let newPage = Number(this.state.currentPage);
    if (newPage !== 1) {
      newPage -= 1;
    }
    return {
      pathname: `/pagination`,
      search: `s=${this.state.term}&page=${newPage}`,
    }
  }
  getNextPage() {
    let newPage = Number(this.state.currentPage);
    if (newPage < (this.state.totalResults / this.state.pageSize))
      newPage += 1;
    return {
      pathname: `/pagination`,
      search: `s=${this.state.term}&page=${newPage}`,
    }
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
        <div>current page: {this.state.currentPage}</div>
        <Link to={this.getNextPage()}>next page</Link>

        <br />
        Total pages: {this.state.maxPages}
      </div>
    )
  }
}

export default PaginatedList;
