import React, { Component } from 'react'
import { withStyles, Fab, TextField, InputAdornment, Button } from '@material-ui/core';
import Dropdown from '../../../components/Dropdown';
import * as API from '../../../services/api';

import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import CardCar from '../../../components/CardCar';

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
      result: [],
      moreOptions: false,
      data: {}
    }
  }

  handleSelectItem = (field, item) => {
    this.setState({ ...this.setState, search: { ...this.state.search, [field]: item } })
  }

  clearAll = () => {
    this.setState({ ...this.getInitState() })
  }

  handleSearch = async () => {
    try {
      const response = await API.search(this.state.search);

      if (response.status !== 200) return

      this.setState({ ...this.state, result: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  renderCarsTops = () => {
    const { result } = this.state
    const { classes } = this.props
    const tops = result.slice(0, 3)

    return (
      <div className={classes.topsContainer}>
        <h1>Tops</h1>
        <div className={classes.tops}>
          {
            tops.map((car, index) => <CardCar key={index} car={car} />)
          }
        </div>
      </div>
    )
  };

  renderCarsOptions = () => {
    const { result } = this.state
    const { classes } = this.props
    const options = result.slice(3, result.length)

    return (
      <div className={classes.optionContainer}>
        <h1>Outras Opçoes</h1>
        <div className={classes.options}>
          {
            options.map((car, index) => <CardCar key={index} car={car} />)
          }
        </div>
        }
      </div>
    )
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>

        <div className={classes.form}>

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
            <Fab color="primary" onClick={this.handleSearch} aria-label="Add">
              <SearchIcon />
            </Fab>
          </div>
        </div>

        {
          this.state.result.length ? this.renderCarsTops() : false
        }

        {
          this.state.result.length ? this.state.moreOptions ? this.renderCarsOptions()
            : <Button onClick={() => this.setState({ ...this.state, moreOptions: true })}>Mais Opções</Button>
            : false
        }

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
  },
  results: {
    marginTop: theme.spacing.unit * 10,
  },
  topsContainer: {
    marginTop: theme.spacing.unit * 15,
  },
  tops: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionContainer: {
    marginTop: theme.spacing.unit * 15,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing.unit,
    overflowX: 'scroll',
  }
});

export default withStyles(styles)(Search)