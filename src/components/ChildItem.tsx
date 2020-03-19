import React, { Component } from "react";
import axios from "axios";

export class ChildItem extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: [] };
  }

  onClick = (name: string) => {
    let entity = localStorage.getItem(name);
    if (!entity) {
      axios
        .get(`${name}.json`)
        .then(response => {
          this.setState({ data: response.data.Entity.Fields });
          localStorage.setItem(
            response.data.Entity._Name,
            JSON.stringify(response.data.Entity)
          );
          entity = localStorage.getItem(name);
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 404) {
            alert("no data for this entity");
          }
        });
    }
    console.log(entity);
  };

  render() {
    return (
      <div
        style={{ border: "1px solid black", padding: "10px" }}
        onClick={() => {
          this.onClick(this.props._Type);
        }}
      >
        <i>{this.props._Description}</i>
      </div>
    );
  }
}

export default ChildItem;
