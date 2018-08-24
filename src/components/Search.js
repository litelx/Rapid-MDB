import React from 'react';
import Autocomplete from 'react-autocomplete';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '', //this.props.match.params.searchQuery || '', // movie name query to search
      suggestList: this.props.suggestList || []
    };
  }
  render() {
    return (

      <div className="search">
        <label htmlFor="">Search Movie:</label>
        <Autocomplete className="Autocomplete"
          getItemValue={(item) => item['Title']}
          items={this.props.suggestList || []}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}
              key={item['imdbID']}>
              {item['Title']}
            </div>
          }
          value={this.state.term || ''}
          onChange={event => this.onInputChange(event.target.value)}
          onSelect={(term, val) => this.onInputSelect(term, val)}
        />
      </div>
    )
  }
  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
  onInputSelect(term, val) {
    this.setState({ term });
    this.props.onSearchTermSelect(val);

  }
}

export default Search;
