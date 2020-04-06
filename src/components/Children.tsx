import React, { Component } from "react";
import ChildItem from "./ChildItem";

export class Children extends Component<any, {}> {
  renderCurrent = (data: any, margin: number) => {
    const result = [];
    if (data) {
      for (const [index, element] of data.entries()) {
        result.push(
          <ChildItem
            key={index}
            _Description={element._Description}
            _Type={element._Type.substring(6, element._Type.length)}
            margin={margin}
          ></ChildItem>
        );
      }
    }
    return result;
  };
  render() {
    const { data, margin } = this.props;
    return <React.Fragment>{this.renderCurrent(data, margin)}</React.Fragment>;
  }
}

export default Children;
