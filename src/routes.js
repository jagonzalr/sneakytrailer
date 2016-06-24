
// React
import React from 'react'

// React Router
import { Route, IndexRoute } from 'react-router'

// Containers
import App from './containers/App'
import AsyncMovies from './containers/AsyncMovies'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={AsyncMovies} />
    <Route path="/discovery" component={AsyncMovies} />
  </Route>
)

export default routes