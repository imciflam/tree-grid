import React, { Component } from "react";
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
    if (this.state.data.length === 0) {
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
    } else {
      this.setState({ data: [] });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={
            "parent-item " +
            (this.state.data.length !== 0
              ? "parent-item--open"
              : "parent-item--closed")
          }
          style={{ marginLeft: this.props.margin }}
          onClick={() => {
            this.onClick(this.props.data._Name);
          }}
        >
          {this.props.data._Description}
        </div>
        <div style={{ marginLeft: "20px" }}>
          {this.renderCurrent(this.state.data)}
        </div>
      </React.Fragment>
    );
  }
}

export default Parent;
