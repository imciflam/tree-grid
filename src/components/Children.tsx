import React, { Component } from "react";
import ChildItem from "./ChildItem";

export class Children extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentWillUnmount() {
    console.log("children unmount");
  }

  renderCurrent = (data: any, margin: number) => {
    let result = [];
    if (data && data.length !== 0) {
      for (let element of data) {
        result.push(
          <ChildItem
            _Description={element._Description}
            _Type={element._Type.substring(6, element._Type.length)}
            margin={margin}
            // @ts-ignore
          ></ChildItem>
        );
      }
    }
    return result;
  };
  render() {
    return (
      <div>
        <div>{this.renderCurrent(this.props.data, this.props.margin)}</div>
      </div>
    );
  }
}

export default Children;
