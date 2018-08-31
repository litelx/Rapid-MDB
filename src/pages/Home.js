import React from 'react';

import logo from '../logo.svg';
import _ from 'lodash';
import Search from '../components/Search';
import PaginatedList from '../components/PaginatedList';
import { Route } from 'react-router-dom';
import { fetchingSearchData } from '../actions/fetchingData';
import MovieItem from '../components/MovieItem';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            totalResults: 0
        };
    }
    componentWillMount() {
        if (this.props.history.location.pathname === '/' && this.props.history.location.search.indexOf("?s=") === 0) {
            const term = this.props.history.location.search.substring(3);
            this.movieSearch(term);
        } else {
            this.props.history.push(
                {
                    pathname: `/`
                }
            );
        }
    }
    movieSearch(term) {
        let results = fetchingSearchData(term, this.getApiPage(this.getPage()));
        if (!results) return;
        results.then(res => {
            this.movies = res.Search;
            this.setState({ totalResults: res.totalResults });
            this.setState({ term: term });
            this.props.history.push(
                {
                    pathname: `/pagination`,
                    search: `s=${term}&page=${this.getPage()}`,
                }
            );
        })
    }
    pagesList(term, page) {
        let results = fetchingSearchData(term, page);
        if (!results) return;
        results.then(res => {
            this.movies = res.Search;
        })
    }
    getPage() {
        const elemnt = this.props.history.location.search;
        if (elemnt.indexOf('&page=') !== -1) {
            const pageNumber = elemnt.substring(elemnt.indexOf('&page=') + 6);
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
            let list = movieList.map((movie) =>
                <MovieItem key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    imdbID={movie.imdbID}
                    poster={movie.Poster}>
                </MovieItem>
            );
            updatedResults['resultsFrom'] = Number((this.getApiPage(this.getPage()) * 10) - 9);
            updatedResults['moviesListItems'] = list;
        }
        return updatedResults;
    }
    render() {
        const movieSearch = _.debounce((term) => this.movieSearch(term), 300);
        const paginationSize = 5;

        const temp = (page) => {
            this.pagesList(this.state.term, this.getApiPage(page));
        };
        let updatedResults = this.createUpdate(this.movies);

        return (
            <div className="list-item">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Rapid-MDB</h1>
                </header>

                <Search onSearchTermChange={movieSearch} suggestList={this.movies}></Search>

                <Route path="/pagination" render={routeProps =>
                    <PaginatedList {...routeProps}
                        currentPage={this.getPage()}
                        term={this.state.term}
                        totalResults={this.state.totalResults}
                        pageSize={paginationSize}
                        updatedResults={updatedResults}
                        onSearchLinkChange={temp}
                    />}
                />
            </div>
        );
    }
}

export default Home;
