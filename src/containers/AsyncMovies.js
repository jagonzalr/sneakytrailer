
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { fetchMovies } from '../actions'
import {
  API_MOVIE_NOW_PLAYING,
  API_MOVIE_POPULAR,
  API_MOVIE_TOP_RATED,
  API_MOVIE_UPCOMING
} from '../actions'

import Movies from '../components/Movies'
import NavBar from '../components/NavBar'

class AsyncMovies extends Component {
  constructor(props) {
    super(props)

    this.logChange = this.logChange.bind(this)

    this.state = {
      filter: API_MOVIE_NOW_PLAYING
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchMovies(this.state.filter))
  }

  logChange(select) {
    if (select) {
      this.setState({filter: select.value})
      this.props.dispatch(fetchMovies(select.value))
    }
  }

  render() {

    var options = [
      { value: API_MOVIE_NOW_PLAYING, label: 'Now Playing' },
      { value: API_MOVIE_POPULAR, label: 'Popular' },
      { value: API_MOVIE_TOP_RATED, label: 'Top Rated' },
      { value: API_MOVIE_UPCOMING, label: 'Upcoming' }
    ]

    return (
      <div>
        <NavBar />
        <div className="container">
          <section className="main-box">
            <div className="row">
              <div className="col-xs-12 main-box-header">
                
                  <div className="col-xs-6 col-sm-9">
                    <h3>Movies</h3>
                  </div>
                  <div className="col-xs-6 col-sm-3">
                    <Select
                      name="form-field-name"
                      value={this.state.filter}
                      options={options}
                      onChange={this.logChange}
                    />
                  
                </div>
              </div>
            </div>
            {this.props.movies.length > 0 &&
              <Movies movies={this.props.movies} />
            }
          </section>
        </div>
      </div>
    )
  }
}

AsyncMovies.propTypes = {
  movies: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { rootReducer } = state

  const {
    movies: movies
  } = rootReducer.fetchMovies || {
    movies: []
  }
  return {
    movies
  }
}

export default connect(mapStateToProps)(AsyncMovies)