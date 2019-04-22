import React, { Component } from 'react'
import { Snackbar, withStyles, SnackbarContent, IconButton } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import IconClose from '@material-ui/icons/Close'

export class SnackbarComponent extends Component {

  render() {
    const { classes, isOpen, type, message, onClose } = this.props
    let handleClass = classes.info;

    if (type) handleClass = classes[type]

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={2000}
        open={isOpen}
        onClose={onClose}>
        <SnackbarContent
          className={handleClass}
          aria-describedby="client-snackbar"
          message={<span className={classes.message}>{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={onClose}>
              <IconClose />
            </IconButton>
          ]}
        />
      </Snackbar >
    )
  }
}

const styles = theme => ({
  success: {
    backgroundColor: green[800],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15
  }
})
export default withStyles(styles)(SnackbarComponent)
