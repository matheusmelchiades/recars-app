import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core'

export class Menu extends Component {

  renderMenuOptions = () => {
    const { classes } = this.props
    const menuOptions = this.props.menuOptions || []

    return menuOptions.map((option, index) => (
      <Button key={index} variant="contained" color="secondary" className={classes.menuButton}
        onClick={() => this.props.history.push(option.path)}>
        {/* onClick={() => console.log(option.path)}> */}
        {option.label}
      </Button>
    ))
  }

  render() {

    const { classes } = this.props

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.logo} variant="h6" color="inherit">
              Recars
            </Typography>
            {
              this.renderMenuOptions()
            }
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
  }
})

export default withRouter(withStyles(styles)(Menu))
