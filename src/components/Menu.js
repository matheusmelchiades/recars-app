import React, { Component } from 'react'
import helper from '../helper/auth'
import { withRouter } from 'react-router-dom'
import { withStyles, AppBar, Toolbar, Button, IconButton } from '@material-ui/core'
import ExitAppIcon from '@material-ui/icons/ExitToApp'
import logoRecars from '../assets/logo_recars_branco.png'

export class Menu extends Component {

  renderMenuOptions = () => {
    const { classes, location } = this.props
    const menuOptions = this.props.menuOptions || []
    const classSelected = (option) => location.pathname === option.path ? classes.selected : ''

    return menuOptions.map((option, index) => (
      <Button key={index} variant="contained" color="secondary" className={`${classes.menuButton} ${classSelected(option)}`}
        onClick={() => this.props.history.push(option.path)} >
        {option.label}
      </Button>
    ))
  }

  handleLogout = () => {
    helper.logOut()
    this.props.history.push('/login')
  };

  render() {

    const { classes } = this.props

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.logo}>
              <img src={logoRecars} height={80} alt="icon_image" />
            </div>
            {
              this.renderMenuOptions()
            }
            <IconButton className={`${classes.menuButton} ${classes.menuLogOut}`}
              onClick={this.handleLogout}>
              <ExitAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = (theme) => ({
  container: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
    fontWeight: 800,
    fontSize: 40
  },
  menuButton: {
    margin: theme.spacing.unit,
    marginLeft: -12,
    marginRight: 20,
    fontWeight: 600,
    fontSize: 15,
    color: '#fff',
  },
  menuLogOut: {
    marginRight: -5
  },
  selected: {
    backgroundColor: theme.palette.secondary.dark,
  }
})

export default withRouter(withStyles(styles)(Menu))
