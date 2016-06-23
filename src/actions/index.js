
import fetch from 'isomorphic-fetch'

export const API_KEY = 'c9f275f40959cb82bcf835e53318d37a'
export const API_URL = 'http://api.themoviedb.org'
export const API_VERSION = '/3'
export const API_MOVIE = '/movie'
export const API_MOVIE_NOW_PLAYING = 'API_MOVIE_NOW_PLAYING'
export const API_MOVIE_POPULAR = 'API_MOVIE_POPULAR'
export const API_MOVIE_TOP_RATED = 'API_MOVIE_TOP_RATED'
export const API_MOVIE_UPCOMING = 'API_MOVIE_UPCOMING'
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

export function requestFetchMovies(listType) {
  return {
    type: REQUEST_FETCH_MOVIES,
    listType: API_MOVIE_LIST_TYPES[listType]
  }
}

export function receiveFetchMovies(listType, json) {
  return {
    type: RECEIVE_FETCH_MOVIES,
    listType: API_MOVIE_LIST_TYPES[listType],
    json
  }
}

export function fetchMovies(listType) {
  console.log(listType)
  return dispatch => {
    dispatch(requestFetchMovies(listType))
    return fetch(API_URL + API_VERSION + API_MOVIE + API_MOVIE_LIST_TYPES[listType] + '?api_key=' + API_KEY, {
      headers: {
        'Accept': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveFetchMovies(listType, json)))
  }
}