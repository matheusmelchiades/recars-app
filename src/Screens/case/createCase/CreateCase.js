import React, { Component } from 'react'
import * as API from '../../../services/api'
import {
  withStyles, FormControl, TextField, InputLabel,
  MenuItem, Select, OutlinedInput, Card, Fab, CircularProgress
} from '@material-ui/core'
import Autocomplete from '../../../components/Autocomplete'

import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '../../../components/Snackbar';

class CreateCase extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitState()
  }

  componentDidMount() { this.refresh() }

  getInitState = () => {
    return {
      clear: false,
      result: '',
      selecteds: {},
      loader: {
        open: false,
        type: 'info',
        message: ''
      },
      newCase: {
        brand: '',
        model: '',
        category: '',
        type: '',
        generalUse: '',
        competence: '',
        priceAverage: 0,
        images: []
      },
      data: {
        brands: [],
        models: [],
        category: [],
        type: [],
        generalUse: [],
        competence: [],
      }
    }
  }

  refresh = async () => {
    try {
      const response = await API.getAttributes();

      if (response.status !== 200) return

      this.setState({ data: { ...this.state.data, ...response.data } })
    } catch (err) {
      console.log(err)

      this.showSnackBar('error', 'Erro em buscar atributos!')
    }
  };

  handleChangeInput = (field, input) => {
    const stateInput = this.state.newCase
    stateInput[field] = input

    if (field === 'brand')
      this.handlerSearchBrand(input)

    if (field === 'model') {
      this.handlerSearchModel(input)
    }

    this.setState({ newCase: stateInput }, this.handleResult)
  }

  renderSelect = (field, label, data) => {
    const { classes } = this.props
    const labelWith = label.length * 7;

    return (
      <FormControl variant="outlined" className={classes.field}>
        <InputLabel>{label}</InputLabel>
        <Select
          onChange={(e) => this.handleChangeInput(field, e.target.value)}
          input={
            <OutlinedInput
              value={this.state.newCase[field]}
              name={field}
              labelWidth={labelWith} />
          }>
          {
            data && data.map((opt, index) => (
              <MenuItem key={index} value={opt}
                onChange={() => console.log(opt)}>
                {opt}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  }

  handleResult = (event) => {
    const { newCase } = this.state
    this.setState({ result: JSON.stringify(newCase) })
  }

  searchACarImages = async () => {
    const { model, brand } = this.state.newCase

    if (!model && !brand) return

    try {
      this.setState({ ...this.state, isLoading: true })
      const response = await API.searchImageCar(model, brand)

      if (!response.data.length) throw Error

      this.setState({ data: { ...this.state.data, searchCar: response.data }, isLoading: false })
    } catch (err) {
      console.log(err)
      this.setState({ ...this.state, isLoading: false })
      this.showSnackBar('error', 'Erro em buscar as imagens!')
    }
  }

  renderCardCar = () => {
    const { classes } = this.props
    const { searchCar } = this.state.data

    if (!searchCar || !searchCar.length) return false

    return (
      <div className={classes.options}>
        {
          searchCar.map((value, index) => (
            <Card key={index} className={classes.containerCar} elevation={10}
              onClick={() => this.handleSelectImage(value)}>
              <img src={value.url} height={355} width={550} alt={value.name} />
            </Card>
          ))
        }
      </div>
    )
  }

  handleSelectImage = (img) => {
    const caseCurrent = this.state.newCase

    if (caseCurrent.images.length === 2) return
    if (caseCurrent.images.some((image) => image._id === img._id)) return

    caseCurrent.images.push(img)

    this.setState({ newCase: { ...caseCurrent } }, this.handleResult)
  }

  renderImagesSelectds = () => {
    const { classes } = this.props
    const { images } = this.state.newCase

    if (!images.length) return

    return (
      <div className={classes.selecteds} >
        {
          images.map((value, index) => (
            <Card key={index} className={classes.containerCar}
              onClick={() => this.removeSelected(value)}>
              <img src={value.url} height={350} width={550} alt={value.name} />
            </Card>
          ))
        }
      </div>
    )
  }

  removeSelected = (img) => {
    const images = this.state.newCase.images

    if (!images.length) return

    const imageRemoved = images.filter((image) => image._id !== img._id)

    this.setState({ newCase: { ...this.state.newCase, images: imageRemoved } }, this.handleResult)
  }

  clearAll = () => {
    const { clearBrand, clearModel } = this.state

    if (clearBrand) clearBrand()
    if (clearModel) clearModel()

    this.setState({ ...this.getInitState() }, this.refresh)
  }

  handleCreateCase = async () => {
    if (!this.isValidCase()) return

    try {
      const response = await API.createCase(this.state.newCase)

      if (response.status >= 222) {
        return this.showSnackBar('error', 'Caso ja cadastrado!')
      }

      this.clearAll()
      this.showSnackBar('success', 'Caso criado com sucesso!')
    } catch (err) {
      console.log(err)
      this.showSnackBar('error', 'Erro em criar caso!')
    }
  }

  async handlerSearchBrand(value) {
    try {
      const response = await API.searchBrand(value)

      if (response.status !== 200) return

      this.setState({ ...this.state, data: { ...this.state.data, brands: response.data } })
    } catch (err) {
      console.log(err)

      this.showSnackBar('error', 'Erro em buscar a marca!')
    }
  }

  async handlerSearchModel(value) {
    try {
      const { brandSelect } = this.state
      const brand_id = brandSelect ? brandSelect._id : ' '
      const response = await API.searchModel(brand_id, value)

      if (response.status !== 200) return

      this.setState({ ...this.state, data: { ...this.state.data, models: response.data } })
    } catch (err) {
      console.log(err)

      this.showSnackBar('error', 'Erro em buscar o modelo!')
    }
  }


  isValidCase = () => {
    const newCase = this.state.newCase

    if (newCase.images.length < 2)
      return this.showSnackBar('info', 'Duas images devem ser selecionada!')
    if (!newCase.brand)
      return this.showSnackBar('info', 'Marca não foi selecionado!')
    if (!newCase.model)
      return this.showSnackBar('info', 'Modelo não foi selecionado!')
    if (!newCase.category)
      return this.showSnackBar('info', 'Categoria não foi selecionado!')
    if (!newCase.type)
      return this.showSnackBar('info', 'Tipo foi selecionado!')
    if (!newCase.generalUse)
      return this.showSnackBar('info', 'Uso geral não foi selecionado!')
    if (!newCase.competence)
      return this.showSnackBar('info', 'Competencia não foi selecionado!')
    if (newCase.priceAverage <= 0)
      return this.showSnackBar('info', 'Media deve ser maio que 0')

    return true;
  }

  showSnackBar = (type, message) => {
    this.setState({
      ...this.setState,
      loader: {
        ...this.state.loader,
        open: true,
        message,
        type
      }
    })
    return false
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        {/* {
          this.state.result ?
            <div>
              {
                this.state.result
              }
            </div>
            : false
        } */}
        <div className={classes.form}>

          <Fab className={classes.button} color="primary" onClick={this.clearAll} aria-label="Add">
            <CloseIcon />
          </Fab>

          <Fab className={classes.button} color="primary" onClick={this.searchACarImages} aria-label="Add">
            <SearchIcon />
          </Fab>

          <Autocomplete value={this.state.newCase.brand} label="Marca"
            clearInput={(clear) => this.setState({ clearBrand: clear })}
            data={this.state.data.brands} fieldRender="name" scroll noFilter
            selectItem={(item) => this.setState({ brandSelect: item })}
            onChange={(value) => this.handleChangeInput('brand', value)} />

          <Autocomplete value={this.state.newCase.brand} label="Modelo"
            clearInput={(clear) => this.setState({ clearModel: clear })}
            selectItem={(value) => this.handleChangeInput('priceAverage', value.priceAverage)}
            data={this.state.data.models} scroll fieldRender="name" noFilter
            onChange={(value) => this.handleChangeInput('model', value)} />

          {
            this.renderSelect('category', 'Categoria', this.state.data.category)
          }
          {
            this.renderSelect('type', 'Tipo', this.state.data.type)
          }
          {
            this.renderSelect('generalUse', 'Uso geral', this.state.data.generalUse)
          }
          {
            this.renderSelect('competence', 'Competencia', this.state.data.competence)
          }

          <TextField className={classes.field} label="Preço" variant="outlined"
            value={this.state.newCase.priceAverage} />

          <Fab className={classes.button} color="primary" onClick={this.handleCreateCase} aria-label="Add">
            <AddIcon />
          </Fab>
        </div>
        {
          this.renderImagesSelectds()
        }

        {
          this.renderCardCar()
        }

        {
          this.state.isLoading &&
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.loader}
            size={24}
            thickness={4}
          />
        }
        <Snackbar
          isOpen={this.state.loader.open}
          type={this.state.loader.type}
          message={this.state.loader.message}
          onClose={() => this.setState({ ...this.state, loader: { ...this.state.loader, open: false } })} />

      </div>
    )
  }
}

const styles = theme => {
  return ({
    container: {
      marginTop: theme.spacing.unit * 2,
      padding: theme.spacing.unit * 8,
      width: '100%',
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
    },
    field: {
      width: '100%',
      margin: theme.spacing.unit,
    },
    selecteds: {
      display: 'flex',
      justifyContent: 'center'
    },
    options: {
      display: 'flex',
      marginTop: theme.spacing.unit * 10,
      overflowX: 'scroll'
    },
    button: {
      margin: theme.spacing.unit,
      width: 500,
    },
    containerCar: {
      margin: theme.spacing.unit,
      minWidth: 550,
      borderRadius: 15
    },
    loader: {
      marginTop: theme.spacing.unit * 40,
      animationDuration: '550ms',
      position: 'absolute',
      left: '50%',
    }
  })
}

export default withStyles(styles)(CreateCase)
