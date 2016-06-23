
require('static/styles.scss')

import React, { Component, PropTypes } from 'react'

import {
  API_IMAGE_URL,
  API_IMAGE_SIZE_ORIGINAL,
  API_IMAGE_SIZE_W780,
  API_IMAGE_SIZE_H632
} from '../actions'

class MoviePoster extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var posterUrl = 'http://placehold.it/1600x2400?text=' + this.props.title
    if (this.props.posterPath) {
      posterUrl = API_IMAGE_URL + API_IMAGE_SIZE_ORIGINAL + this.props.posterPath
    }
    return (
      <div className="col-xs-12 col-sm-6 col-md-3">
        <div className="thumbnail" target="_blank">
          <a href="#">
            <img src={posterUrl} alt={this.props.title} />
          </a>
        </div>
      </div>
    )
  }
}

MoviePoster.propTypes = {}

export default MoviePoster