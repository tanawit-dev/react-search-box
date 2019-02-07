import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'

import styles from './styles.css'

export default class ReactSearchBox extends Component {
  static propTypes = {
    value: PropTypes.string,
    pleaceholder: PropTypes.string,
    data: PropTypes.array.isRequired
  }

  static defaultProps = {
    data: []
  }

  state = {
    value: '',
    matchedRecords: []
  }

  constructor(props) {
    super(props)

    const { data } = props

    // fuse option
    const options = {
      thrshold: 0.05,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: ['value']
    }

    this.fuse = new Fuse(data, options)
  }

  componentDidMount() {
    const { value } = this.props
    const matchedRecords = this.fuse.search(value)
    this.setState({
      value: value.trim(),
      matchedRecords,
      showDropdown: !!value.trim()
    })
  }

  handleInputChange = e => {
    const { value } = e.target
    const matchedRecords = this.fuse.search(value)

    this.setState({
      value: value.trim(),
      matchedRecords,
      showDropdown: true
    })
  }

  inputNode = () => {
    const { pleaceholder } = this.props
    const { value } = this.state

    return (
      <input
        className={styles.input}
        type='text'
        pleaceholder={pleaceholder}
        value={value}
        onChange={this.handleInputChange}
      />
    )
  }

  handleDropdownItemClick = record => {
    const { value } = record
    this.setState({
      value,
      showDropdown: false
    })
  }

  dropdownNode = () => {
    const { matchedRecords, showDropdown } = this.state

    if (!showDropdown) return false

    return (
      <div className={`react-search-box-dropdown ${styles.dropdown}`}>
        <ul className={styles.dropdownList}>
          {matchedRecords.map(record => {
            return (
              <li
                key={record.key}
                className={`react-search-box-dropdown-list-item ${styles.dropdownListItem}`}
                onClick={() => this.handleDropdownItemClick(record)}
              >
                {record.value}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.inputNode()}
        {this.dropdownNode()}
      </div>
    )
  }
}
