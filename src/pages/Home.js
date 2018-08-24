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
            movies: [],
            totalResults: 0
        };
    }
    componentWillMount() {
        if (this.props.history.location.pathname === '/' && this.props.history.location.search.indexOf("?s=") === 0) {
            const term = this.props.history.location.search.substring(3);
            this.movieSearch(term);
        }
    }

    movieSearch(term) {
        let results = fetchingSearchData(term, '');
        if (!results) return;
        results.then(res => {
            this.setState({ movies: res.Search });
            this.setState({ totalResults: res.totalResults });
            this.setState({ term: term });
            this.props.history.push(
                {
                    pathname: `/pagination`,
                    search: `s=${term}&page=${1}`,
                }
            );
        })
    }

    render() {
        const movieSearch = _.debounce((term) => this.movieSearch(term), 300);

        return (
            <div className="list-item">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Rapid-MDB</h1>
                </header>
                <Search onSearchTermChange={movieSearch} suggestList={this.state.movies}
                    onSearchTermSelect={(item) => this.setState({ movies: [item] })} ></Search>

                <Route path="/pagination" render={routeProps => <PaginatedList {...routeProps} list={this.state.movies} listItem={MovieItem} />} />
            </div>
        );
    }
}

export default Home;
