
import { combineReducers } from 'redux';

import {
  REQUEST_FETCH_MOVIES, RECEIVE_FETCH_MOVIES
} from '../actions'

export function fetchMovies(state = {
  isLoading: false,
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

const rootReducer = combineReducers({
  fetchMovies
})

export default rootReducer
