import React, { Component } from 'react'
import API, { signin, signup } from '../../services/api'
import { withStyles, Tabs, Tab, Paper } from '@material-ui/core';
import styles from './style';
import SwipeableView from 'react-swipeable-views'
import Signin from './Signin';
import Signup from './Signup';


export class Login extends Component {
  state = {
    tab: 0
  }

  handleChange = () => {
    const { tab } = this.state;
    this.setState({ tab: tab === 1 ? 0 : 1 })
  };

  signin = async (values) => {
    try {
      const resp = await signin(values)

      if (resp.status !== 200) return

      API.defaults.headers.common['Authorization'] = `bearer ${resp.data.token}`

      this.props.history.push('case')
    } catch (err) {
      console.log(err)
    }
  }

  signup = async (values) => {
    console.log(values)
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Tabs value={this.state.tab} indicatorColor="primary" textColor="primary" onChange={this.handleChange}>
            <Tab label="sign in" />
            <Tab label="sign up" />
          </Tabs>

          <SwipeableView
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.tab}>
            {
              this.state.tab === 0 ? <Signin onSignin={this.signin} /> : <div></div>
            }
            {
              this.state.tab === 1 ? <Signup onSignup={this.signup} /> : <div></div>
            }
          </SwipeableView>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Login)
