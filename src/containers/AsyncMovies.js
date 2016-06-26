
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import ScrollToTop from 'react-scroll-up'
import TweenFunctions from 'tween-functions'

import { fetchMovies } from '../actions'
import {
  API_MOVIE_NOW_PLAYING,
  API_MOVIE_POPULAR,
  API_MOVIE_TOP_RATED,
  API_MOVIE_UPCOMING
} from '../actions'

import Movies from '../components/Movies'
import MoviesHeader from '../components/MoviesHeader'
import Pager from '../components/Pager'

class AsyncMovies extends Component {
  constructor(props) {
    super(props)

    this.selectChange = this.selectChange.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.scrollStep = this.scrollStep.bind(this)
    this.stopScrolling = this.stopScrolling.bind(this)

    this.state = {
      filter: API_MOVIE_NOW_PLAYING,
      startValue: 0,
      currentTime: 0,
      startTime: null,
      rafId: null,
      showPagination: false
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchMovies(this.state.filter, 0))
  }

  previousPage(e) {
    e.preventDefault()
    var previousPage = this.props.page - 1
    if (previousPage > 0) {
      this.setState({
        startValue: window.pageYOffset,
        currentTime: 0,
        startTime: null,
        rafId: window.requestAnimationFrame(this.scrollStep)
      })

      this.props.dispatch(fetchMovies(this.state.filter, previousPage))
    }
    
  }

  nextPage(e) {
    e.preventDefault()
    var nextPage = this.props.page + 1
    if (nextPage <= this.props.totalPages ) {
      this.setState({
        startValue: window.pageYOffset,
        currentTime: 0,
        startTime: null,
        rafId: window.requestAnimationFrame(this.scrollStep)
      })

      this.props.dispatch(fetchMovies(this.state.filter, nextPage))
    }
  }

  selectChange(select) {
    if (select) {
      this.setState({filter: select.value})
      this.props.dispatch(fetchMovies(select.value, 0))
    }
  }

  scrollStep() {
    var timestamp = Date()

    var position = TweenFunctions['easeOutCubic'](timestamp, this.state.startValue, 0, 0);

    if (window.pageYOffset <= 0) {
        this.stopScrolling();
    } else {
        window.scrollTo(window.pageYOffset, position);
        this.setState({rafId:window.requestAnimationFrame(this.scrollStep)})
    }
  }

  stopScrolling() {
    window.cancelAnimationFrame(this.state.rafId);
  }

  render() {

    var options = [
      { value: API_MOVIE_NOW_PLAYING, label: 'Now Playing' },
      { value: API_MOVIE_POPULAR, label: 'Popular' },
      { value: API_MOVIE_TOP_RATED, label: 'Top Rated' },
      { value: API_MOVIE_UPCOMING, label: 'Upcoming' }
    ]

    var titles = {
      API_MOVIE_NOW_PLAYING: 'Now Playing',
      API_MOVIE_POPULAR: 'Popular',
      API_MOVIE_TOP_RATED: 'Top Rated',
      API_MOVIE_UPCOMING: 'Upcoming'
    }

    return (
      <div className="container">

        <section className="main-box">
          
          <MoviesHeader
            titles={titles}
            filter={this.state.filter}
            options={options}
            selectChange={this.selectChange} />

          {this.props.isLoading &&
             <i className="fa fa-spinner fa-spin fa-3x fa-fw loading"></i>
          }

          {!this.props.isLoading && this.props.movies.length > 0 &&
            <div>
              <Movies movies={this.props.movies} />
              <Pager
                current={this.props.page}
                total={this.props.totalPages}
                previousPage={this.previousPage}
                nextPage={this.nextPage}
                showMovieDBLogo={true} />
            </div>
          }

        </section>

        <ScrollToTop showUnder={600}>
          <span className="fa-stack fa-2x">
            <i className="fa fa-circle fa-stack-2x scroll-to-top"></i>
            <i className="fa fa-angle-double-up fa-stack-1x fa-inverse"></i>
          </span>
        </ScrollToTop>

      </div>
    )
  }
}

AsyncMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { rootReducer } = state

  const {
    isLoading: isLoading,
    movies: movies,
    page: page,
    totalPages: totalPages
  } = rootReducer.fetchMovies || {
    isLoading: true,
    movies: [],
    page: 1,
    totalPages: 1
  }
  return {
    isLoading,
    movies,
    page,
    totalPages
  }
}

export default connect(mapStateToProps)(AsyncMovies)