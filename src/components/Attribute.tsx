import React, { Component } from "react"

export class Attribute extends Component<any, any> {
  renderCurrent(data: any) {
    let result = []
    if (data && data.length !== 0) {
      for (let element of data) {
        result.push(<div>{element._Description}</div>)
      }
    }
    return result
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Attribute</h1>
        <div>content</div>
        <div>{this.renderCurrent(this.props.data)}</div>
      </div>
    )
  }
}

export default Attribute
