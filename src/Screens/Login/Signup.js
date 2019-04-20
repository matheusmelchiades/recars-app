import React, { Component } from 'react';
import { withStyles, Avatar, Typography, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import styles from './style';
import HowToRegIcon from '@material-ui/icons/HowToReg';

export class Signup extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: ''
  }

  handleInputUSername = (event) => {
    const { value } = event.target;

    this.setState({ username: value });
  }

  handleInputPassword = (event) => {
    const { value } = event.target;

    this.setState({ password: value });
  }

  handleInputPasswordConfirm = (event) => {
    const { value } = event.target;

    this.setState({ passwordConfirm: value });
  }

  handleSubmit = () => {
    const state = this.state;

    if (state.password !== state.passwordConfirm) return

    this.props.onSignup(state)
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Avatar className={classes.avatar}>
          <HowToRegIcon />
        </Avatar>
        <Typography align='center' component="h1" variant="h5"> Sign up </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Username</InputLabel>
            <Input name="username" autoComplete="username" autoFocus onChange={this.handleInputUSername} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Password</InputLabel>
            <Input type="password" name="password" autoComplete="current-password" onChange={this.handleInputPassword} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Password Confirm</InputLabel>
            <Input type="password" name="passwordConfirm" onChange={this.handleInputPasswordConfirm} />
          </FormControl>

          <Button className={classes.submit} fullWidth variant="contained" color="primary"
            onClick={this.handleSubmit}>
            sign up
                    </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(Signup)
