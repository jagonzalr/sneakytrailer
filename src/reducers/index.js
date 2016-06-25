
import { combineReducers } from 'redux';

import {
  REQUEST_FETCH_MOVIES, RECEIVE_FETCH_MOVIES,
  REQUEST_FETCH_MOVIE_VIDEOS, RECEIVE_FETCH_MOVIE_VIDEOS
} from '../actions'

export function fetchMovies(state = {
  isLoading: true,
  movies: [],
  page: 1,
  totalPages: 1
}, action) {
  switch(action.type) {
    case REQUEST_FETCH_MOVIES:
      return Object.assign({}, state, {
        isLoading: true
      })
    case RECEIVE_FETCH_MOVIES:
      return Object.assign({}, state, {
        isLoading: false,
        movies: action.json.results,
        page: action.json.page,
        totalPages: action.json.total_pages
      })
    default:
      return state
  }
}

export function fetchMovieVideos(state = {
  isLoading: true,
  videos: [],
  videoNumber: 0,
  totalVideos: 0
}, action) {
  switch(action.type) {
    case REQUEST_FETCH_MOVIE_VIDEOS:
      return Object.assign({}, state, {
        isLoading: true
      })
    case RECEIVE_FETCH_MOVIE_VIDEOS:
      return Object.assign({}, state, {
        isLoading: false,
        videos: action.json.results,
        videoNumber: action.json.results.length > 0 ? 1 : 0,
        totalVideos: action.json.results.length
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  fetchMovies,
  fetchMovieVideos
})

export default rootReducer
