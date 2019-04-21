import React, { Component } from 'react'
import * as API from '../../../services/api'
import {
  withStyles, FormControl, TextField, InputLabel,
  MenuItem, Select, OutlinedInput, Card, Fab
} from '@material-ui/core'
import Autocomplete from '../../../components/Autocomplete'

import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

const DATA_SELECT = [
  'TESTE 1',
  'TESTE 2',
  'TESTE 3',
  'TESTE 4'
]

class CreateCase extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitState()
  }

  getInitState = () => {
    return {
      clear: false,
      result: '',
      selecteds: {},
      newCase: {
        brand: '',
        model: '',
        category: '',
        type: '',
        generalUse: '',
        competence: '',
        price: '',
        images: []
      },
      data: {
        brands: [],
        models: [],
        category: DATA_SELECT,
        type: DATA_SELECT,
        generalUse: DATA_SELECT,
        competence: DATA_SELECT,
      }
    }
  }

  handleChangeInput = (field, input) => {
    const stateInput = this.state.newCase
    stateInput[field] = input

    if (field === 'brand')
      this.handlerSearchBrand(input)

    if (field === 'model')
      this.handlerSearchModel(input)

    this.setState({ newCase: stateInput }, this.handleResult)
  }

  renderSelect = (field, label, data) => {
    const { classes } = this.props
    const labelWith = label.length * 7;

    return (
      <FormControl variant="outlined" className={classes.field}>
        <InputLabel>{label}</InputLabel>
        <Select
          // value={this.state.newCase[field]}
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
      const response = await API.searchImageCar(model, brand)

      this.setState({ data: { ...this.state.data, searchCar: response.data } })
    } catch (err) {
      console.log(err)
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
            <Card key={index} className={classes.containerCar}
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

    this.setState({ ...this.getInitState() })
  }

  handleCreateCase = async () => {
    try {
      const response = await API.createCase(this.state.newCase)

      if (!response !== 200) return

      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  async handlerSearchBrand(value) {
    try {
      const response = await API.searchBrand(value)

      if (response.status !== 200) return

      this.setState({ ...this.state, data: { ...this.state.data, brands: response.data } })
    } catch (err) {
      console.log(err)
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
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        {
          this.state.result ?
            <div>
              {
                this.state.result
              }
            </div>
            : false
        }
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
            value={this.state.newCase.price}
            onChange={(e) => this.handleChangeInput('price', e.target.value)} />

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
      // backgroundColor: '#8e24aa',
      // color: 'white'
    },


    //
    containerCar: {
      margin: theme.spacing.unit,
      minWidth: 550,
      borderRadius: 15
    }
  })
}

export default withStyles(styles)(CreateCase)

