import React, { Component } from "react";
import "./TreeListItem.css";

export class TreeListItem extends Component<any, any> {
  render() {
    console.log(this.props);
    return (
      <li className="tree-list__item">
        <b>{this.props.name}</b>
      </li>
    );
  }
}

export default TreeListItem;
