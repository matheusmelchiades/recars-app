import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import themeApp from '../config/style'
import Routes from '../config/Routes';

export default () => (
  <MuiThemeProvider theme={themeApp}>
    <CssBaseline />
    <Routes />
  </MuiThemeProvider>
)
