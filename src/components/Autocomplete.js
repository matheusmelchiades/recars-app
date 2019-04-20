import React, { Component } from 'react'
import { withStyles, TextField, Paper, MenuItem } from '@material-ui/core'
import Downshift from 'downshift';

const INITIAL_STATE = {
  input: '',
  openPaper: false,
  clear: false
}

export class AutoComplete extends Component {

  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.clearInput = this.clearInput.bind(this)
  }

  componentDidMount() {
    if (this.props.clearInput) this.props.clearInput(this.clearInput)
  }

  handleInputAndPopper = (event) => {
    const input = event.target.value

    if (input) {
      if (this.props.onChange) this.props.onChange(input)
      this.setState({ openPaper: true })
    }
    else
      this.setState({ openPaper: false })

    this.setState({ input })
  }

  handleSelectItem(item) {
    const field = this.props.fieldRender;
    const handleItem = field ? item[field] : item;
    const input = this.props.notSetItemInput ? '' : handleItem;

    if (this.props.selectItem)
      this.props.selectItem(item)

    if (this.props.onChange) this.props.onChange(handleItem)

    this.setState({ ...INITIAL_STATE, input })
  }

  filter = () => {
    const input = this.state.input.toLowerCase()
    const field = this.props.fieldRender
    const items = this.props.data || []
    const toFilter = (item) => item && item.toString().toLowerCase().trim().includes(input) ? item : false

    return items.filter(item => field ? toFilter(item[field]) : toFilter(item))
  }

  renderItems() {
    const items = this.props.noFilter ? this.props.data : this.filter()
    const field = this.props.fieldRender

    return items.map((item, index) => {
      return (
        <MenuItem
          key={index}
          component="div"
          onClick={() => this.handleSelectItem(item)}>
          {
            field ? item[field] : item
          }
        </MenuItem>
      )
    })
  }

  clearInput() {
    this.setState({ ...INITIAL_STATE })
  }

  render() {
    const { classes, scroll } = this.props

    return (
      <div className={classes.root}>
        <Downshift isOpen={this.state.openPaper}
          onOuterClick={() => this.setState({ openPaper: false })}>
          {
            () => (
              <div className={classes.container}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label={this.props.label}
                  value={this.state.input}
                  onClick={() => this.props.openOnClick ? this.setState({ openPaper: !this.state.openPaper }) : false}
                  onChange={this.handleInputAndPopper}
                />

                {
                  this.state.openPaper ?
                    <Paper className={`${classes.paper} ${scroll ? classes.scroll : ''}`} elevation={6}>
                      {this.renderItems()}
                    </Paper> : false
                }
              </div>
            )
          }
        </Downshift>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    margin: theme.spacing.unit,
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  scroll: {
    maxHeight: 300,
    overflowY: 'auto',
    overflow: 'hidden'
  }
})

export default withStyles(styles)(AutoComplete)
