import React, { Component } from 'react'
import { getApproved, deleteCases, approvePendencies } from '../../../services/api'
import {
  Paper, withStyles, Table, TableHead,
  TableBody, TableCell, TableRow, Checkbox, Button, LinearProgress
} from '@material-ui/core'

class Approved extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      selecteds: [],
      cases: []
    }
  }

  componentDidMount() {
    this.fetchCases()
  }

  fetchCases = async () => {
    try {
      this.setState({ ...this.state, isLoading: true })
      const response = await getApproved();

      if (response.status !== 200) return

      this.setState({ cases: response.data, isLoading: false })
    } catch (err) {
      console.log(err)
    }
  }

  selectItem = (item) => {

    if (this.itemIsSelected(item)) {
      const filterItems = this.state.selecteds.filter(selected => selected && selected._id !== item._id)

      this.setState({ selecteds: filterItems })
    } else
      this.setState({ selecteds: [...this.state.selecteds, item] })
  }

  selectAll = () => {
    const lengthSelected = this.state.selecteds.length
    const lengthPeding = this.state.cases.length || 0

    if (lengthSelected === lengthPeding)
      this.setState({ selecteds: [] })
    else
      this.setState({ selecteds: [...this.state.cases] })
  }

  itemIsSelected = (item) => this.state.selecteds.some(selected => selected && selected._id === item._id)

  handleApproveSelecteds = async () => {
    try {
      const { selecteds } = this.state;

      const response = await approvePendencies({ pendencies: selecteds })

      if (response.status !== 200) return

      this.setState({ selected: [] }, this.fetchCases)
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteCases = async () => {
    try {
      const { selecteds } = this.state;

      const response = await deleteCases({ cases: selecteds })

      if (response.status !== 200) return

      this.setState({ selected: [] }, this.fetchCases)
    } catch (err) {
      console.log(err)
    }
  }

  handleCopy = (text) => {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input)
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.buttons}>
          <Button className={classes.buttonAction}
            variant="contained" color="primary"
            onClick={this.handleDeleteCases}>
            remove
        </Button>
          <Button className={classes.buttonAction}
            variant="contained" color="primary"
            onClick={this.handleApproveSelecteds}>
            Add
        </Button>
        </div>
        <Paper className={classes.container}>
          {
            this.state.isLoading &&
            <LinearProgress />
          }
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox onClick={this.selectAll} />
                </TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Model</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">GeneralUse</TableCell>
                <TableCell align="center">Competence</TableCell>
                <TableCell align="center">Price Average</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.cases.map((newCase, index) => {
                  const isSelected = this.itemIsSelected(newCase)
                  return (
                    <TableRow key={index}
                      className={newCase.error ? classes.error : ''}
                      hover={!newCase.error} selected={isSelected}
                      onClick={newCase.error ? () => ({}) : () => this.selectItem(newCase)}
                      onDoubleClick={(e) => this.handleCopy(newCase._id)}>
                      <TableCell align="center">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell align="center">{newCase.brand}</TableCell>
                      <TableCell align="center">{newCase.model}</TableCell>
                      <TableCell align="center">{newCase.category}</TableCell>
                      <TableCell align="center">{newCase.type}</TableCell>
                      <TableCell align="center">{newCase.generalUse}</TableCell>
                      <TableCell align="center">{newCase.competence}</TableCell>
                      <TableCell align="center">{newCase.priceAverage}</TableCell>
                      <TableCell align="center">{newCase.quantity}</TableCell>
                      <TableCell align="center">{newCase.createdBy.username}</TableCell>
                      <TableCell align="center">{newCase.status}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </Paper>
      </div >
    )
  }
}

const styles = (theme) => ({
  container: {
    margin: theme.spacing.unit * 5,
    overflowX: 'auto'
  },
  error: {
    backgroundColor: '#e57373'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing.unit
  },
  buttonAction: {
    margin: theme.spacing.unit
  }
})

export default withStyles(styles)(Approved)
