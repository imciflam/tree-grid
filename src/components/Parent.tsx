import React, { Component } from "react"

export class Parent extends Component<any, any> {
  render() {
    console.log(this.props)
    return (
      <div
        style={{ color: "blue", border: "1px solid black", padding: "10px" }}
      >
        {this.props.data._Description}
      </div>
    )
  }
}

export default Parent
