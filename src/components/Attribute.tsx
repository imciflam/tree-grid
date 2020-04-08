import React, { Component } from "react";

export class Attribute extends Component<any, {}> {
  render() {
    return (
      <div
        style={{ marginLeft: this.props.margin }}
        key={this.props._Index}
        className="attribute"
      >
        {this.props._Description}
      </div>
    );
  }
}

export default Attribute;
