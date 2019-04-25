import React, { Component } from 'react'
import { withStyles, Fab, TextField, InputAdornment } from '@material-ui/core';
import Dropdown from '../../../components/Dropdown';
import * as API from '../../../services/api';

import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitState()
  }

  async componentDidMount() {
    try {
      const response = await API.getAttributesTosSearch()

      if (response.status !== 200) return

      this.setState({ ...this.state, data: response.data })
    } catch (err) {

    }
  }


  getInitState = () => {
    return {
      search: {
        places: '',
        placeUsed: '',
        classUse: '',
        motor: '',
        priceAverage: ''
      },
      data: {}
    }
  }

  handleSelectItem = (field, item) => {
    this.setState({ ...this.setState, search: { ...this.state.search, [field]: item } })
  }

  clearAll = () => {
    this.setState({ ...this.getInitState() })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        SEARCH
        {/* <div className={classes.form}>

          <div className={classes.button}>
            <Fab color="primary" onClick={this.clearAll} aria-label="Add">
              <CloseIcon />
            </Fab>
          </div>

          <Dropdown label="Lugares" value={this.state.search.places} data={this.state.data.places}
            selectItem={(places) => this.handleSelectItem('places', places)} />

          <Dropdown label="Locais de uso" value={this.state.search.placeUsed} data={this.state.data.placeUsed}
            selectItem={(placeUsed) => this.handleSelectItem('placeUsed', placeUsed)} />

          <Dropdown label="Classificação de uso" value={this.state.search.classUse} data={this.state.data.classUse}
            selectItem={(classUse) => this.handleSelectItem('classUse', classUse)} />

          <Dropdown label="Motor" value={this.state.search.motor} data={this.state.data.motor}
            selectItem={(motor) => this.handleSelectItem('motor', motor)} />

          <TextField className={classes.field} label="Valor medio" value={this.state.search.priceAverage}
            variant="outlined" fullWidth type="number"
            onChange={(event) => this.handleSelectItem('priceAverage', event.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }} />

          <div className={classes.button}>
            <Fab color="primary" onClick={() => console.log(this.state.search)} aria-label="Add">
              <SearchIcon />
            </Fab>
          </div>
        </div> */}
      </div>
    )
  }
}

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 8,
    width: '100%',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  field: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(Search)
