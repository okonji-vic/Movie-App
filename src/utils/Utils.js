const Api_key = "a704d2932b02b0671456d391d93071fa";
                 

export function getApiUrl() {
    return `https://api.themoviedb.org/3/trending/all/week?api_key=${Api_key}&language=en-US`;
}

export function getSearchApiUrl(query) {
    return `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&query=${query}`;
}


