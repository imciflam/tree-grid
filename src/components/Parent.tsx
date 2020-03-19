import React, { Component } from "react";
import axios from "axios";
import Children from "./Children";
import Attribute from "./Attribute";

export class Parent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: [] };
  }

  renderCurrent = (data: any) => {
    if (data && data.length !== 0) {
      let result = [];
      for (let element in data) {
        switch (element) {
          case "Parent":
            result.push(<Parent data={data[element]} />); // bracket notation, because it's variable
            break;
          case "Child":
            result.push(<Children data={data[element]} />);
            break;
          case "Attribute":
            result.push(<Attribute data={data[element]} />);
            break;
          default:
            result.push(<div>unknown</div>);
            break;
        }
      }
      return result;
    }
  };

  onClick = (name: string) => {
    let entity = localStorage.getItem(name);
    if (!entity) {
      axios
        .get(`${name}.json`)
        .then(response => {
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
    if (entity !== null) {
      let parsedData = JSON.parse(entity);
      let childrenData = parsedData.Fields;
      this.setState({ data: childrenData });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ color: "blue", border: "1px solid black", padding: "10px" }}
          onClick={() => {
            this.onClick(this.props.data._Name);
          }}
        >
          {this.props.data._Description}
        </div>
        {this.renderCurrent(this.state.data)}
      </React.Fragment>
    );
  }
}

export default Parent;
