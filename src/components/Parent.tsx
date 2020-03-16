import React, { Component } from "react"

export class Parent extends Component<any, any> {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Parent</h1>
        <div>content</div>
      </div>
    )
  }
}

export default Parent
