import React, { Component } from "react";
import Children from "./Children";
import Attribute from "./Attribute";
import Parent from "./Parent";
import "./styles/App.css";
import storeInterface from "./storeInterface";

export class ChildItem extends Component<any, any> implements storeInterface {
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

  fetchEntity(filename: string) {
    import(`../${filename}`)
      .then(response => {
        localStorage.setItem(
          response.Entity._Name,
          JSON.stringify(response.Entity)
        );
        this.setState({ data: response.Entity.Fields });
      })
      .catch(error => {
        console.log(error);
        alert("no data for this entity");
      });
  }

  checkForCachedEntity(entityName: string) {
    let entity = localStorage.getItem(entityName);
    if (!entity) {
      return false;
    } else {
      let parsedData = JSON.parse(entity);
      return parsedData.Fields;
    }
  }

  onClick = (name: string) => {
    if (!this.state.data) {
      const result = this.checkForCachedEntity(name);
      if (!result) {
        this.fetchEntity(name);
      } else {
        this.setState({ data: result });
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
            this.onClick(this.props._Type);
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
