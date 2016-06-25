
// React
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AsyncMovies from '../containers/AsyncMovies'
import NavBar from '../components/NavBar'

// Styles
require('static/styles.scss')

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AsyncMovies />
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
