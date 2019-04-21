import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Login from '../Screens/Login/index'
import Case from '../Screens/case/index'

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Case} />
          <Redirect from="*" to="/login" />
        </Switch>
      </BrowserRouter>
    )
  }
}
