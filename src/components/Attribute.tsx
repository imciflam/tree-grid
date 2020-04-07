import React, { Component } from "react";

export class Attribute extends Component<any, {}> {
  componentDidMount() {
    console.log("Attribute Mount");
  }
  render() {
    console.log(this.props);
    return (
      <div
        style={{ marginLeft: this.props.margin }}
        key={this.props._Index}
        className="attribute-item"
      >
        {this.props._Description}
      </div>
    );
  }
}

export default Attribute;
