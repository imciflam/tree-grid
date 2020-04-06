import React, { Component } from "react";

export class Attribute extends Component<any, {}> {
  renderCurrent = (data: any) => {
    const result = [];
    if (data) {
      for (const [index, element] of data.entries()) {
        result.push(
          <div key={index} className="attribute-item">
            {element._Description}
          </div>
        );
      }
    }
    return result;
  };

  render() {
    const { data, margin } = this.props;
    return <div style={{ marginLeft: margin }}>{this.renderCurrent(data)}</div>;
  }
}

export default Attribute;
