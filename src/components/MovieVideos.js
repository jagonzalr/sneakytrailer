
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'

import { fetchMovieVideos } from '../actions'

import Pager from '../components/Pager'

class MovieVideos extends Component {
  constructor(props) {
    super(props)

    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)

    this.state = {
      showPlaceholder: true,
      modalIsOpen: false,
      videoNumber: this.props.videoNumber,
      totalVideos: this.props.totalVideos,
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchMovieVideos(this.props.movieId))
    .then(function(response) {
      this.setState({isLoading: false, videoNumber: response.json.results.length > 0 ? 1 : 0, totalVideos: response.json.results.length})
    }.bind(this))
  }

  componentWillUnmount() {
    this.setState({
      showPlaceholder: true,
      modalIsOpen: false,
      videoNumber: 0,
      totalVideos: 0,
      isLoading: true
    })
  }

  previousPage(e) {
    e.preventDefault()
    var previosVideoNumber = this.state.videoNumber - 1
    if (previosVideoNumber > 0) {
      this.setState({videoNumber: previosVideoNumber})
    }
  }

  nextPage(e) {
    e.preventDefault()
    var nextVideoNumber = this.state.videoNumber + 1
    if (nextVideoNumber <= this.state.totalVideos) {
      this.setState({videoNumber: nextVideoNumber})
    }
  }

  render() {

    const youtubeOptions = {
      height    : '390',
      width     : '640',
      playerVars: {
        autoplay: 1
      }
    }

    var videoList = []
    this.props.videos.map((video, i) =>
      videoList.push(<YouTube
        key={i}
        videoId={video.key}
        className={"embed-responsive-item"}
        opts={youtubeOptions}
        onReady={this._onReady}
      />)
    )
    
    return (
      <div>
        {this.props.isLoading &&
           <i className="fa fa-spinner fa-spin fa-3x fa-fw loading"></i>
        }
        {!this.props.isLoading && this.state.totalVideos === 0 &&
          <div style={{marginLeft: '20px', marginTop: '10px'}}>
            <span className="close-modal" onClick={this.props.closeModal}>x</span>
            <div className="row">
              <div className="col-xs-12">
                <h4>There are no videos available.</h4>
              </div>
            </div>
          </div>
        }
        {!this.props.isLoading && this.state.totalVideos > 0 &&
          <div style={{marginTop: '10px'}}>
            <span className="close-modal" onClick={this.props.closeModal}>x</span>
            <div className="row">
              <div className="col-xs-1"></div>
              <div className="col-xs-10">
                <div className="embed-responsive embed-responsive-16by9">
                  {videoList[this.state.videoNumber - 1]}
                </div>
              </div>
              <div className="col-xs-1"></div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Pager
                  current={this.state.videoNumber}
                  total={this.state.totalVideos}
                  previousPage={this.previousPage}
                  nextPage={this.nextPage}
                  showMovieDBLogo={false} />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

MovieVideos.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  videos: PropTypes.array.isRequired,
  videoNumber: PropTypes.number.isRequired,
  totalVideos: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const { rootReducer } = state

  const {
    isLoading: isLoading,
    videos: videos,
    videoNumber: videoNumber,
    totalVideos: totalVideos
  } = rootReducer.fetchMovieVideos || {
    isLoading: true,
    videos: [],
    videoNumber: 1,
    totalVideos: 1
  }
  return {
    isLoading,
    videos,
    videoNumber,
    totalVideos
  }
}

export default connect(mapStateToProps)(MovieVideos)