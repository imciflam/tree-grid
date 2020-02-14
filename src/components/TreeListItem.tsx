import React, { Component } from "react";

export class TreeListItem extends Component<any, any> {
  render() {
    console.log(this.props);
    return (
      <li>
        <b>{this.props.name}</b>
      </li>
    );
  }
}

export default TreeListItem;
