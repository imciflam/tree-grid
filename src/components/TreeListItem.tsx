import React, { Component } from "react"
import "./TreeListItem.css"

export class TreeListItem extends Component<any, any> {
  public constructor(props: any) {
    super(props)
    this.state = {
      showPopup: false,
      itemChildData: []
    }
  }

  public getChildren(data: any) {
    this.setState({
      showPopup: !this.state.showPopup,
      itemChildData: data
    })
  }

  render() {
    console.log(this.props)
    return (
      <li className='tree-list__item'>
        {this.props.name ? (
          <button onClick={() => this.getChildren(this.props)}>></button>
        ) : (
          ""
        )}
        <span className='tree-list__text'>{this.props.name}</span>
        {this.state.showPopup ? <div>111</div> : ""}
      </li>
    )
  }
}

export default TreeListItem
