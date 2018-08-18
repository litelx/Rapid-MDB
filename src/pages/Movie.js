import React from 'react';

class Movie extends React.Component {
    render() {
        console.log('Movie component');

        return (
          <div className="movie">
            <h1>IMG</h1> 
            <h2>Movie title:</h2> 
          </div>
        )
    }
}

export default Movie;
