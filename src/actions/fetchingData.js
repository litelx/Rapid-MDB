
const API_KEY = 'f7f83581';
const ROOT_URL = `http://www.omdbapi.com/`;
const FETCH_URL = `${ROOT_URL}?apikey=${API_KEY}`

export function fetchingSearchData(movieNameQuery, page) {
    if (!movieNameQuery) return null;
    let url = `${FETCH_URL}&s=${movieNameQuery}`;
    if (page) {
        url += `&page=${page}`;
    }
    return fetching(url);
}

export function fetchingMovieData(imdbId) {
    if (!imdbId) return null;
    const url = `${FETCH_URL}&i=${imdbId}`;
    return fetching(url);
}

function fetching(url) {
    let result = fetch(url)
        .then(response => {
            if (response)
                return response.json()
        })
        .then(data => {
            if (data.Response) {
                return data;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.log(error);
            return null;
        });
    return result;
}