
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

import {
  API_IMAGE_URL,
  API_IMAGE_SIZE_ORIGINAL
} from '../actions'

import MovieVideos from './MovieVideos'

class MoviePoster extends Component {
  constructor(props) {
    super(props)

    this.onImageLoaded  = this.onImageLoaded.bind(this)
    this.onImageErrored = this.onImageErrored.bind(this)
    this.openModal      = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal     = this.closeModal.bind(this)

    this.state = {
      showPlaceholder : true,
      modalIsOpen     : false
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onImageLoaded() {
    this.setState({showPlaceholder: false})
  }

  onImageErrored() {
    this.setState({showPlaceholder: true})
  }

  render() {
    const posterUrl = API_IMAGE_URL + API_IMAGE_SIZE_ORIGINAL + this.props.posterPath
    const hideImage = this.props.posterPath ? false : true

    const customStyles = {
      content : {
        backgroundColor : '#FDFDFD',
        top             : '50%',
        left            : '50%',
        right           : 'auto',
        bottom          : 'auto',
        marginTop       : '80px',
        outline         : 'none'
      }
    }
    
    return (
      <div className="col-xs-12 col-sm-6 col-md-3">
        <div className="thumbnail">
          <a href="#" style={{textAlign: 'center'}} onClick={this.openModal}>
          {!hideImage &&
            <img onLoad={this.onImageLoaded} onError={this.onImageErrored} src={posterUrl} alt={this.props.title} />
          }
          
          {this.state.showPlaceholder &&
            <div>
              <i className="fa fa-picture-o fa-5x placeholder" aria-hidden="true"></i>
              <h5>{this.props.title}</h5>
            </div>
          }
          </a>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          className={'container'}
          onRequestClose={this.closeModal}
          style={customStyles}>
            <MovieVideos movieId={this.props.movieId} closeModal={this.closeModal} />
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(MoviePoster)
