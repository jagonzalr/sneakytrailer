// React
import React, { PropTypes, Component } from 'react'
import Masonry from 'react-masonry-component'

// React Router
import { Link } from 'react-router'

// Components
import MoviePoster from './MoviePoster'

require('static/styles.scss')


export default class Movies extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var childElements = this.props.movies.map((movie, i) =>
      <MoviePoster key={i} posterPath={movie.poster_path} title={movie.original_title} />
    )

    return (
      <div className="row">
        <Masonry
          className={'main-box-content'}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
          {childElements}
        </Masonry>
      </div>
    )
  }
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired
}

export default Movies