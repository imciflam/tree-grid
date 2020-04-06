import React, { Component } from "react";
import Children from "./Children";
import Attribute from "./Attribute";
import Parent from "./Parent";
import "./App.css";

export class ChildItem extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: false, order: 0 };
  }

  renderCurrent = (data: any, marginData: number) => {
    if (data && marginData) {
      const result = [];
      for (const [index, [element, value]] of Object.entries(
        Object.entries(data)
      )) {
        switch (element) {
          case "Parent":
            result.push(
              <Parent data={value} margin={marginData} key={index} />
            );
            break;
          case "Child":
            result.push(
              <Children data={value} margin={marginData} key={index} />
            );
            break;
          case "Attribute":
            result.push(
              <Attribute data={value} margin={marginData} key={index} />
            );
            break;
          default:
            result.push(<React.Fragment>unknown</React.Fragment>);
            break;
        }
      }
      return result;
    }
  };

  onClick = (name: string, order: number) => {
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
        this.setState({ data: childrenData, order: order + 1 });
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
            "child-item " +
            (this.state.data ? "child-item--open" : "child-item--closed")
          }
          style={{ marginLeft: this.props.margin }}
          onClick={() => {
            this.onClick(this.props._Type, this.state.order);
          }}
        >
          <i>{this.props._Description}</i>
        </div>
        <div style={{ marginLeft: this.props.margin }}>
          {this.renderCurrent(this.state.data, this.state.order + 10)}
        </div>
      </React.Fragment>
    );
  }
}

export default ChildItem;
