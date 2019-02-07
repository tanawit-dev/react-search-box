import React, { Component } from 'react'

import ReactSearchBox from 'react-search-box'

export default class App extends Component {

  dummyData = [
    {
      key: "john",
      value: "John Doe"
    },
    {
      key: "jane",
      value: "Jane Doe"
    },
    {
      key: "mary",
      value: "Mary Phillips"
    },
    {
      key: "robert",
      value: "Robert"
    },
    {
      key: "karius",
      value: "Karius"
    }
  ]

  render () {
    return (
      <div>
        <ReactSearchBox
          pleaceholder='Modern React component module'
          value="Doe"
          data={this.dummyData}
        />
      </div>
    )
  }
}
