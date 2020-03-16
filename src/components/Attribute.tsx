import React, { Component } from "react"

export class Attribute extends Component<any, any> {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Attribute</h1>
        <div>content</div>
      </div>
    )
  }
}

export default Attribute
