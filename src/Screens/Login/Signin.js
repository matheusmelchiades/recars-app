import React, { Component } from 'react'
import { withStyles, Avatar, Typography, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import styles from './style'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


export class Signin extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputUsername = (event) => {
    const { value } = event.target;

    this.setState({ username: value })
  }

  handleInputPassword = (event) => {
    const { value } = event.target;

    this.setState({ password: value })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>

        <Typography align='center' component="h1" variant="h5"> Sign in </Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Username</InputLabel>
            <Input name="username" onChange={this.handleInputUsername} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Password</InputLabel>
            <Input type="password" name="password" onChange={this.handleInputPassword} autoComplete="current-password" />
          </FormControl>

          <Button className={classes.submit} fullWidth variant="contained" color="primary"
            onClick={() => this.props.onSignin(this.state)}>
            sign in
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(Signin)
