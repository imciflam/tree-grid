import React, { Component } from "react";

export class Parent extends Component<any, any> {
  onClick = (name: string) => {
    let entity = localStorage.getItem(name);
    if (!entity) {
      // axios call
    }
  };
  render() {
    return (
      <div
        style={{ color: "blue", border: "1px solid black", padding: "10px" }}
        onClick={() => {
          this.onClick(this.props.data._Name);
        }}
      >
        {this.props.data._Description}
      </div>
    );
  }
}

export default Parent;
