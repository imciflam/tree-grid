import React, { Component } from "react";
import Children from "./Children";
import Attribute from "./Attribute";
import Parent from "./Parent";
import "./App.css";

export class ChildItem extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: [], order: 0 };
  }

  componentWillUnmount() {
    console.log("childitem unmount");
  }

  renderCurrent = (data: any, marginData: number) => {
    console.log(marginData);
    if (data && data.length !== 0 && marginData) {
      let result = [];
      for (let element in data) {
        switch (element) {
          case "Parent":
            result.push(<Parent data={data[element]} margin={marginData} />); // bracket notation, because it's variable
            break;
          case "Child":
            result.push(<Children data={data[element]} margin={marginData} />);
            break;
          case "Attribute":
            result.push(<Attribute data={data[element]} margin={marginData} />);
            break;
          default:
            result.push(<div>unknown</div>);
            break;
        }
      }
      return result;
    }
  };

  onClick = (name: string, order: any) => {
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
        this.setState({ data: childrenData, order: order + 1 });
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
            "child-item " +
            (this.state.data.length !== 0
              ? "child-item--open"
              : "child-item--closed")
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
