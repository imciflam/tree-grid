import React, { Component } from "react";
import Children from "./Children";
import Attribute from "./Attribute";
import Parent from "./Parent";

export class ChildItem extends Component<any, any> {
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
      import(`../${name}`)
        .then(response => {
          localStorage.setItem(
            response.Entity._Name,
            JSON.stringify(response.Entity)
          );
          entity = localStorage.getItem(name);
        })
        .catch(error => {
          console.log(error);
          alert("no data for this entity");
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
          style={{ border: "1px solid black", padding: "10px" }}
          onClick={() => {
            this.onClick(this.props._Type);
          }}
        >
          <i>{this.props._Description}</i>
        </div>
        {this.renderCurrent(this.state.data)}
      </React.Fragment>
    );
  }
}

export default ChildItem;
