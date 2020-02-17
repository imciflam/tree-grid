import React, { Component } from "react"
import TreeListItem from "./TreeListItem"
import "./TreeList.css"

export class TreeList extends Component<any, any> {
  render() {
    const data = Object.keys(this.props.data)
    console.log(data)
    return (
      <ul className='tree-list__container'>
        {data.map((item: any, index) => (
          <TreeListItem className='tree-list__item' name={data[index]} />
        ))}
      </ul>
    )
  }
}

export default TreeList
