
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import ScrollToTop from 'react-scroll-up'
import TweenFunctions from 'tween-functions'

import { searchMovie } from '../actions'

import Movies from '../components/Movies'
import DiscoveryHeader from '../components/DiscoveryHeader'
import Pager from '../components/Pager'

class AsyncDiscovery extends Component {
  constructor(props) {
    super(props)

    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.scrollStep = this.scrollStep.bind(this)
    this.stopScrolling = this.stopScrolling.bind(this)
    this.searchMovie = this.searchMovie.bind(this)

    this.state = {
      searchText: '',
      startValue: 0,
      currentTime: 0,
      startTime: null,
      rafId: null,
      showPagination: false
    }
  }

  componentDidMount() {
    this.props.dispatch(searchMovie(this.state.searchText, 1))
  }

  componentWillUnmount() {
    this.setState({
      searchText: '',
      startValue: 0,
      currentTime: 0,
      startTime: null,
      rafId: null,
      showPagination: false
    })
  }

  previousPage(e) {
    e.preventDefault()
    var previousPage = this.props.page - 1
    if (previousPage > 0) {
      this.setState({
        startValue: window.pageYOffset,
        currentTime: 0,
        startTime: null,
        rafId: window.requestAnimationFrame(this.scrollStep),
        timeout: 0
      })

      this.props.dispatch(searchMovie(this.state.searchText, previousPage))
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

      this.props.dispatch(searchMovie(this.state.searchText, nextPage))
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

  selectChange(select) {
    if (select) {
      this.setState({filter: select.value})
      this.props.dispatch(fetchMovies(select.value, 0))
    }
  }

  stopScrolling() {
    window.cancelAnimationFrame(this.state.rafId);
  }

  searchMovie(e) {
    var searchText = e.target.value
    this.props.dispatch(searchMovie(searchText, 1))
    this.setState({searchText: searchText})
  }

  render() {

    return (
      <div>

        <section className="main-box">

          <DiscoveryHeader
            searchText={this.state.searchText}
            searchMovie={this.searchMovie} />

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

AsyncDiscovery.propTypes = {
  movies: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isSearching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { rootReducer } = state

  const {
    isSearching: isSearching,
    movies: movies,
    page: page,
    totalPages: totalPages
  } = rootReducer.searchMovie || {
    isSearching: true,
    movies: [],
    page: 1,
    totalPages: 1
  }
  return {
    isSearching,
    movies,
    page,
    totalPages
  }
}

export default connect(mapStateToProps)(AsyncDiscovery)