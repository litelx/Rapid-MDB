import React from 'react';
import { Link } from 'react-router-dom';
import './PaginatedList.css';

class PaginatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {}, // => Dictionary -> key: page, value: list size of pageSize
      pageSize: this.props.pageSize || 5, // number of items in page
      term: this.props.term,
      totalResults: this.props.totalResults || 0,
      currentPage: this.props.currentPage || 1,
      updatedResults: this.props.updatedResults, // object{ startresult: list}
    };
  }
  componentWillMount() {
    if (this.props.updatedResults['resultsFrom']) {
      this.updateStatePages(this.props.updatedResults['resultsFrom'], this.props.updatedResults['moviesListItems']);
    }
  }
  componentWillReceiveProps(updatedProps) {
    if (updatedProps.currentPage !== this.props.currentPage) {
      this.setState({ currentPage: updatedProps.currentPage });
    }
    if (updatedProps.term !== this.props.term) {
      this.setState({ term: updatedProps.term });
      this.setState({ totalResults: updatedProps.totalResults });
      this.setState({ currentPage: updatedProps.currentPage });
      this.setState({ updatedResults: updatedProps.updatedResults });
      this.setState({ pages: {} });
    }

    if (updatedProps.updatedResults['resultsFrom'] !== this.props.updatedResults['resultsFrom']) {
      this.setState({ updatedResults: updatedProps.updatedResults });
    }
    if (!this.state.pages[updatedProps.currentPage] && updatedProps.updatedResults['resultsFrom']) {
      this.updateStatePages(updatedProps.updatedResults['resultsFrom'], updatedProps.updatedResults['moviesListItems']);
    }
  }
  updateStatePages(startResults, list) {
    let pages = { ...this.state.pages };
    const pagesCount = list.length / this.state.pageSize;

    for (let i = 0; i < pagesCount; i++) {

      let pageNumber = (startResults + (this.state.pageSize - 1)) / this.state.pageSize;
      let pageResults = list.slice(i * this.state.pageSize, (i + 1) * this.state.pageSize);
      let element = {};
      element[pageNumber] = [...pageResults];
      Object.assign(pages, element);

      startResults = startResults + this.state.pageSize;
    }

    this.setState({
      pages:
        pages
    });

  }
  getPreviousePage(currentPage) {
    let newPage = Number(currentPage);
    if (newPage !== 1) {
      newPage -= 1;
    }

    if (!this.state.pages[newPage]) {
      console.log('needs to call new pages');
      // this.props.onSearchLinkChange(newPage);
    }

    return {
      pathname: `/pagination`,
      search: `s=${this.state.term}&page=${newPage}`,
    }
  }
  getNextPage(currentPage) {
    let newPage = Number(currentPage);
    if (newPage < (this.state.totalResults / this.state.pageSize)) {
      newPage += 1;
    }

    if (!this.state.pages[newPage]) {
      this.props.onSearchLinkChange(newPage);
    }

    return {
      pathname: `/pagination`,
      search: `s=${this.state.term}&page=${newPage}`,
    }
  }
  render() {


    return (
      <div className="PaginatedList">
        {this.state.pages[this.state.currentPage]}

        <div className="page-details">

          <label>PaginatedList Movie:</label>
          <br />
          <br />
          Showing movies results: {this.state.resultsFrom} - {this.state.resultsTo} out of {this.state.totalResults}
          <br />
          <br />

          <Link to={this.getPreviousePage(this.state.currentPage)}>previouse page</Link>
          <div>current page: {this.state.currentPage}</div>
          <Link to={this.getNextPage(this.state.currentPage)}>next page</Link>

          <br />
          Total pages: {this.state.maxPages}
        </div>
      </div>
    )
  }
}

export default PaginatedList;
