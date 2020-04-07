import React, { Component } from "react";
import Children from "./Children";
import Attribute from "./Attribute";

interface myState {
  data: boolean | object;
}

export class Parent extends Component<any, myState> {
  constructor(props: any) {
    super(props);
    this.state = { data: false };
  }

  renderCurrent = (data: any) => {
    if (data) {
      let result = [];
      for (const [index, [element, value]] of Object.entries(
        Object.entries(data)
      )) {
        switch (element) {
          case "Parent":
            result.push(<Parent data={value} key={index} />);
            break;
          case "Child":
            result.push(<Children data={value} key={index} />);
            break;
          case "Attribute":
            result.push(<Attribute data={value} key={index} />);
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
    if (!this.state.data) {
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
      this.setState({ data: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={
            "parent-item " +
            (this.state.data ? "parent-item--open" : "parent-item--closed")
          }
          style={{ marginLeft: this.props.margin }}
          onClick={() => {
            this.onClick(this.props.data._Name);
          }}
        >
          {this.props.data._Description}
        </div>
        <div style={{ marginLeft: "21px" }}>
          {this.renderCurrent(this.state.data)}
        </div>
      </React.Fragment>
    );
  }
}

export default Parent;
