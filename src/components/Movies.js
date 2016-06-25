// React
import React, { PropTypes, Component } from 'react'
import Masonry from 'react-masonry-component'
import Transition from 'react-motion-ui-pack'
import { spring } from 'react-motion'

// Components
import MoviePoster from './MoviePoster'


export default class Movies extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var childElements = this.props.movies.map((movie, i) =>
      <MoviePoster 
        key={i} 
        posterPath={movie.poster_path} 
        title={movie.original_title} 
        movieId={movie.id} />
    )

    return (
      <div className="row">
        <Transition
          component="div"
          enter={{
            opacity: 1,
            translateY: spring(10, {stiffness: 150, damping: 10}),
            height: 'auto'
          }}
          leave={{
            opacity: 0.2,
            translateY: {val: -10},
            height: 0
          }}
        >  
          <Masonry
            key="masonry"
            className={'main-box-content'}
            disableImagesLoaded={false} 
            updateOnEachImageLoad={false}
          >
            {childElements}
          </Masonry>
        </Transition>
      </div>
    )
  }
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired
}

export default Movies