import React, { Component } from 'react'
import { withStyles, Fab, TextField, InputAdornment, Button, CircularProgress, Typography } from '@material-ui/core';
import Dropdown from '../../../components/Dropdown';
import * as API from '../../../services/api';

import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import CardCar from '../../../components/CardCar';
import Snackbar from '../../../components/Snackbar';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitState()
  }

  componentDidMount() { this.refresh() }

  refresh = async () => {
    try {
      const response = await API.getAttributesTosSearch()

      if (response.status !== 200) return

      this.setState({ ...this.state, data: response.data })
    } catch (err) {
      this.showSnackBar('error', 'Erro em carregar valores')
    }
  }

  getInitState = () => {
    return {
      search: {
        places: '',
        placeUsed: '',
        classUse: '',
        motor: '',
        priceMin: '',
        priceMax: ''
      },
      result: [],
      moreOptions: false,
      buttonMoreOptions: false,
      isLoading: false,
      snackbar: {
        open: false,
        type: 'info',
        message: ''
      },
      data: {}
    }
  }

  handleSelectItem = (field, item) => {
    this.setState({ ...this.setState, search: { ...this.state.search, [field]: item } })
  }

  clearAll = () => {
    this.setState({ ...this.getInitState() }, this.refresh)
  }

  handleSearch = async () => {
    if (!this.isValidCase()) return
    if (this.state.result.length) await this.setState({ ...this.state, isLoading: true, result: [] })

    try {
      this.setState({ ...this.state, isLoading: true })
      const response = await API.search(this.state.search);

      if (response.status !== 200) return

      this.setState({ ...this.state, result: response.data, isLoading: false })
    } catch (err) {
      console.log(err)
      this.showSnackBar('error', 'Erro em buscar')
    }
  }

  showSnackBar = (type, message) => {
    this.setState({
      ...this.setState,
      snackbar: {
        ...this.state.snackbar,
        open: true,
        message,
        type
      }
    })
    return false
  }

  renderCarsTops = () => {
    const { result } = this.state
    const { classes } = this.props
    const tops = result.slice(0, 3)

    return (
      <div className={classes.topsContainer}>
        <Typography variant="h3" gutterBottom>
          Melhores Opçoes
        </Typography>
        <div className={classes.tops}>
          {
            tops.map((car, index) => <CardCar key={index} index={index} car={car} />)
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
        <Typography variant="h3" gutterBottom>
          Outras Opçoes
        </Typography>
        <div className={classes.options}>
          {
            options.map((car, index) => <CardCar key={index} car={car} />)
          }
        </div>
      </div>
    )
  };

  isValidCase = () => {

    const { places, placeUsed, classUse, motor, priceMin, priceMax } = this.state.search

    if (!places)
      return this.showSnackBar('info', 'Lugares não foi selecionado!')
    if (!placeUsed)
      return this.showSnackBar('info', 'Locais de uso não foi selecionado!')
    if (!classUse)
      return this.showSnackBar('info', 'Classificacao de uso não foi selecionado!')
    if (!motor)
      return this.showSnackBar('info', 'Motor não foi selecionado!')
    if (!priceMin)
      return this.showSnackBar('info', 'Valor minimo não foi selecionado!')
    if (priceMin > priceMax)
      return this.showSnackBar('info', 'Valor minimo não pode ser maior que o valor maximo!')
    if (!priceMax)
      return this.showSnackBar('info', 'Valor maximo não foi selecionado!')

    return true;
  }

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

          <TextField className={classes.field} label="Valor minimo" value={this.state.search.priceMin}
            variant="outlined" fullWidth type="number"
            onChange={(event) => this.handleSelectItem('priceMin', event.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }} />

          <TextField className={classes.field} label="Valor maximo" value={this.state.search.priceMax}
            variant="outlined" fullWidth type="number"
            onChange={(event) => this.handleSelectItem('priceMax', event.target.value)}
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
          this.state.result.length ? this.state.moreOptions ?
            <div>
              <Button className={classes.buttonOptions}
                onClick={() => this.setState({ ...this.state, moreOptions: false })}>
                <Typography>Menos opçoes</Typography>
              </Button>
              {
                this.renderCarsOptions()
              }
            </div>
            : <Button className={classes.buttonOptions}
              onClick={() => this.setState({ ...this.state, moreOptions: true })}>
              <Typography>Mais opçoes</Typography>
            </Button>
            : false
        }

        {
          this.state.isLoading &&
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.loader}
            size={24}
            thickness={4} />
        }

        <Snackbar
          isOpen={this.state.snackbar.open}
          type={this.state.snackbar.type}
          message={this.state.snackbar.message}
          onClose={() => this.setState({ ...this.state, snackbar: { ...this.state.snackbar, open: false } })} />
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
  },
  loader: {
    marginTop: theme.spacing.unit * 40,
    animationDuration: '550ms',
    position: 'absolute',
    left: '50%',
  },
  buttonOptions: {
    left: '90%'
  }
});

export default withStyles(styles)(Search)
