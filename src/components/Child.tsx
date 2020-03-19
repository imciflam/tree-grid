import React, { Component } from "react";

export class Child extends Component<any, any> {
  onClick = (name: string) => {
    let entity = localStorage.getItem(name);
    if (!entity) {
      // axios call
    }
  };

  renderCurrent = (data: any) => {
    let result = [];
    if (data && data.length !== 0) {
      for (let element of data) {
        result.push(
          <div
            style={{ border: "1px solid black", padding: "10px" }}
            onClick={() => {
              this.onClick(element._Name);
            }}
          >
            <i>{element._Description}</i>
          </div>
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

export default Child;
