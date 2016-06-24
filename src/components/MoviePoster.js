
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

    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.handleImageErrored = this.handleImageErrored.bind(this)

    this.state = {
      placeholderUrl: 'http://placehold.it/1600x2400?text=' + this.props.title,
      showPlaceholder: true
    }
  }

  handleImageLoaded() {
    this.setState({showPlaceholder: false})
  }

  handleImageErrored() {
    this.setState({showPlaceholder: true})
  }

  render() {
    var posterUrl = 'http://placehold.it/1600x2400?text=' + this.props.title
    if (this.props.posterPath) {
      posterUrl = API_IMAGE_URL + API_IMAGE_SIZE_ORIGINAL + this.props.posterPath
    }

    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div className="col-xs-12 col-sm-6 col-md-3">
        <div className="thumbnail" target="_blank">
          <a href="#">
            <img onLoad={this.handleImageLoaded} onError={this.handleImageErrored} src={this.state.showPlaceholder ? this.state.placeholderUrl : posterUrl} alt={this.props.title} />
          </a>
        </div>
      </div>
    )
  }
}

MoviePoster.propTypes = {}

export default MoviePoster