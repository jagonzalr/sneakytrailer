
import fetch from 'isomorphic-fetch'

export const API_KEY = 'c9f275f40959cb82bcf835e53318d37a'
export const API_URL = 'http://api.themoviedb.org'
export const API_VERSION = '/3'
export const API_MOVIE = '/movie'
export const API_MOVIE_VIDEOS = '/videos'
export const API_MOVIE_NOW_PLAYING = 'API_MOVIE_NOW_PLAYING'
export const API_MOVIE_POPULAR = 'API_MOVIE_POPULAR'
export const API_MOVIE_TOP_RATED = 'API_MOVIE_TOP_RATED'
export const API_MOVIE_UPCOMING = 'API_MOVIE_UPCOMING'
export const API_SEARCH = '/search'

export const API_MOVIE_LIST_TYPES = {
  API_MOVIE_NOW_PLAYING: '/now_playing',
  API_MOVIE_POPULAR: '/popular',
  API_MOVIE_TOP_RATED: '/top_rated',
  API_MOVIE_UPCOMING: '/upcoming'
}

export const API_IMAGE_URL = 'https://image.tmdb.org/t/p'
export const API_IMAGE_SIZE_ORIGINAL = '/original'
export const API_IMAGE_SIZE_W780 = '/w780'
export const API_IMAGE_SIZE_H632 = '/h632'

export const REQUEST_FETCH_MOVIES = 'REQUEST_FETCH_MOVIES'
export const RECEIVE_FETCH_MOVIES = 'RECEIVE_FETCH_MOVIES'
export const REQUEST_FETCH_MOVIE_VIDEOS = 'REQUEST_FETCH_MOVIE_VIDEOS'
export const RECEIVE_FETCH_MOVIE_VIDEOS = 'RECEIVE_FETCH_MOVIE_VIDEOS'
export const REQUEST_SEARCH_MOVIE = 'REQUEST_SEARCH_MOVIE'
export const RECEIVE_SEARCH_MOVIE = 'RECEIVE_SEARCH_MOVIE'

export function requestFetchMovies(listType, page) {
  return {
    type: REQUEST_FETCH_MOVIES,
    listType: API_MOVIE_LIST_TYPES[listType],
    page
  }
}

export function receiveFetchMovies(listType, page, json) {
  return {
    type: RECEIVE_FETCH_MOVIES,
    listType: API_MOVIE_LIST_TYPES[listType],
    page,
    json
  }
}

export function fetchMovies(listType, page) {
  return dispatch => {
    dispatch(requestFetchMovies(listType, page))
    var url = API_URL + API_VERSION + API_MOVIE + API_MOVIE_LIST_TYPES[listType] + '?api_key=' + API_KEY
    if (page > 1) {
      url = url + '&page=' + page
    }

    return fetch(url, {
      headers: {
        'Accept': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveFetchMovies(listType, page, json)))
  }
}

export function requestFetchMovieVideos(movieId) {
  return {
    type: REQUEST_FETCH_MOVIE_VIDEOS,
    movieId
  }
}

export function receiveFetchMovieVideos(movieId, json) {
  return {
    type: RECEIVE_FETCH_MOVIE_VIDEOS,
    movieId,
    json
  }
}

export function fetchMovieVideos(movieId) {
  return dispatch => {
    dispatch(requestFetchMovieVideos(movieId))
    var url = API_URL + API_VERSION + API_MOVIE + '/' + movieId + API_MOVIE_VIDEOS + '?api_key=' + API_KEY
    return fetch(url, {
      headers: {
        'Accept': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveFetchMovieVideos(movieId, json)))
  }
}

export function requestSearchMovie(query, page) {
  return {
    type: REQUEST_SEARCH_MOVIE,
    query,
    page
  }
}

export function receiveSearchMovie(query, page, json) {
  return {
    type: RECEIVE_SEARCH_MOVIE,
    query,
    page,
    json
  }
}

export function searchMovie(query, page) {
  return dispatch => {
    dispatch(requestSearchMovie(query, page))

    if (query.length === 0) {
      return dispatch(receiveSearchMovie(query, page, null))
    } else {
      var url = API_URL + API_VERSION + API_SEARCH + API_MOVIE + '?api_key=' + API_KEY + '&query=' + encodeURI(query)
      if (page > 1) {
        url = url + '&page=' + page
      }

      return fetch(url, {
        headers: {
          'Accept': 'application/json'
        },
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => dispatch(receiveSearchMovie(query, page, json)))
    }
  }
}
