import React from 'react';

import Search from '../components/Search';
import PaginatedList from '../components/PaginatedList';
import { Route } from 'react-router-dom';


class Home extends React.Component {
    render() {
        console.log('Home component');

        return (
            <div className="list-item">
                <Search></Search>
                <Route path="/:qsearchQuery/:page" component={PaginatedList} />
            </div>
        );
    }
}

export default Home;
