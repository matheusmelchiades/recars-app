import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Menu from '../../components/Menu'

import Search from './search/index'
import CreateCase from './createCase/CreateCase'
import Penging from './penging/index'
import API from '../../services/api';

const teste = [
  {
    "path": "/",
    "label": "Pesquisa"
  },
  {
    "path": "/case",
    "label": "Novo Caso"
  },
  {
    "path": "/penging",
    "label": "Pendencias"
  }
]

export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.state.menuOptions = teste
  }

  async componentDidMount() {
    try {
      const response = await API.get('/fields')

      if (response.status !== 200) return

      // this.setState({ menuOptions: response.data.menu })

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Menu menuOptions={this.state.menuOptions} />
        {
          this.state.menuOptions &&
          <div>
            <Route path='/' exact component={Search} />
            <Route path='/case' component={CreateCase} />
            <Route path='/penging' component={Penging} />
          </div>
        }
      </div>
    )
  }
}

export default index
