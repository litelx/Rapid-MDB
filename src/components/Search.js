import React from 'react';

class Search extends React.Component {

    render() {
        console.log('Search component')
        return (
            
          <div className="search">
            <label htmlFor="">Search Movie:</label> 
            <input type="text" />
          </div>
        )
    }
}

export default Search;
