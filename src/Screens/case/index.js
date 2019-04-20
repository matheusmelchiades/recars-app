import React, { Component } from 'react'
import CreateCase from './createCase/CreateCase';
import API from '../../services/api';

export class index extends Component {
  async componentDidMount() {
    try {
      const response = await API.get('/fields')

      console.log(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <CreateCase />
      </div>
    )
  }
}

export default index
