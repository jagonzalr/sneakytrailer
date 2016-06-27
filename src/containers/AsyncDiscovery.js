
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

class AsyncDiscovery extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}

  render() {

    return (
      <div className="container">

        <h3>Discovery</h3>

      </div>
    )
  }
}

AsyncDiscovery.propTypes = {

}

function mapStateToProps(state) {

  return {}

}

export default connect(mapStateToProps)(AsyncDiscovery)