import React, { Component } from "react"
import TreeListItem from "./TreeListItem"
import "./TreeList.css"

export class TreeList extends Component<any, any> {
  render() {
    const data = this.props.data
    return (
      <ul className='tree-list__container'>
        {data.map((item: any) => (
          <TreeListItem
            className='tree-list__item'
            key={item.id}
            name={item.name}
          />
        ))}
      </ul>
    )
  }
}

export default TreeList
