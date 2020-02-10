import React, { Component } from "react"
import TreeListItem from "./TreeListItem"

export class TreeList extends Component<any, any> {
  render() {
    const data = Object.keys(this.props.data)
    console.log(data)
    return (
      <div>
        {data.map((item: any, index) => (
          <TreeListItem name={data[index]} />
        ))}
      </div>
    )
  }
}

export default TreeList
