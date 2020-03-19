import React, { Component } from "react";
import ChildItem from "./ChildItem";

export class Children extends Component<any, any> {
  renderCurrent = (data: any) => {
    let result = [];
    if (data && data.length !== 0) {
      for (let element of data) {
        result.push(
          <ChildItem
            _Description={element._Description}
            _Type={element._Type.substring(6, element._Type.length)}
          ></ChildItem>
        );
      }
    }
    return result;
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div>{this.renderCurrent(this.props.data)}</div>
      </div>
    );
  }
}

export default Children;