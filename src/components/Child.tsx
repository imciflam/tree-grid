import React, { Component } from "react"

export class Child extends Component<any, any> {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Child</h1>
        <div>content</div>
      </div>
    )
  }
}

export default Child
