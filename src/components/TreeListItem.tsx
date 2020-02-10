import React, { Component } from "react"

export class TreeListItem extends Component<any, any> {
  render() {
    console.log(this.props)
    return (
      <div>
        <li>
          <b>{this.props.name}</b>
        </li>
      </div>
    )
  }
}

export default TreeListItem
