import React, { Component } from "react"
import "./TreeListItem.css"

export class TreeListItem extends Component<any, any> {
  public constructor(props: any) {
    super(props)
  }

  public getChildren(name: string) {
    alert(name)
  }

  render() {
    console.log(this.props)
    return (
      <li className='tree-list__item'>
        {this.props.name ? (
          <button onClick={() => this.getChildren(this.props.name)}>></button>
        ) : (
          ""
        )}
        <span className='tree-list__text'>{this.props.name}</span>
      </li>
    )
  }
}

export default TreeListItem
