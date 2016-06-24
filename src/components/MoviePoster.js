
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
      showPlaceholder: true,
      hideImage: false

    }
  }

  handleImageLoaded() {
    this.setState({showPlaceholder: false})
  }

  handleImageErrored() {
    this.setState({showPlaceholder: true, hideImage: true})
  }

  render() {
    var posterUrl = API_IMAGE_URL + API_IMAGE_SIZE_ORIGINAL + this.props.posterPath

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
          <a href="#" style={{textAlign: 'center'}}>
          {!this.state.hideImage &&
            <img onLoad={this.handleImageLoaded} onError={this.handleImageErrored} src={posterUrl} alt={this.props.title} />
          }
          
          {this.state.showPlaceholder &&
            <div>
              <i className="fa fa-picture-o fa-5x" aria-hidden="true" style={{textAlign: 'center', display: 'inline-block', width: '100%', height: '300px', color: '#33363A', 'verticalAlign': 'center', 'lineHeight': '300px'}}></i>
              <h5>{this.props.title}</h5>
            </div>
          }
          </a>
        </div>
      </div>
    )
  }
}

MoviePoster.propTypes = {}

export default MoviePoster