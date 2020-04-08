import React, { Component } from "react";
import Attribute from "./Attribute";
import Child from "./Child";
import storeInterface from "./storeInterface";
import "./styles/App.css";

export class Parent extends Component<any, any> implements storeInterface {
  constructor(props: any) {
    super(props);
    this.state = { data: false };
  }

  renderCurrent = (data: any, marginData: number) => {
    if (data && marginData) {
      const result = [];
      for (const [index, [element, value]] of Object.entries(
        Object.entries(data)
      )) {
        switch (element) {
          case "Parent":
            if (typeof value === "object") {
              result.push(
                <Parent
                  {...value}
                  key={index}
                  globalStore={this.props.globalStore}
                  parentCallback={this.props.parentCallback}
                  margin={marginData}
                />
              );
            }
            break;
          case "Child":
            (value as []).forEach((element: object) => {
              result.push(
                <Child
                  {...element}
                  globalStore={this.props.globalStore}
                  parentCallback={this.props.parentCallback}
                  margin={marginData}
                />
              );
            });
            break;
          case "Attribute":
            (value as []).forEach((element: object) => {
              result.push(<Attribute {...element} margin={marginData} />);
            });
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
        const entityName = JSON.stringify(response.Entity._Name);
        const entityData = JSON.stringify(response.Entity);
        this.props.parentCallback(entityName, entityData);
        this.setState({ data: response.Entity.Fields });
      })
      .catch(error => {
        console.log(error);
        alert("no data for this entity");
      });
  }

  checkForCachedEntity(entityName: string) {
    const stringEntityName = JSON.stringify(entityName);
    const entity = this.props.globalStore[stringEntityName];
    if (!entity) {
      return false;
    } else {
      const parsedData = JSON.parse(entity);
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
            "parent " + (this.state.data ? "parent--open" : "parent--closed")
          }
          style={{ marginLeft: this.props.margin }}
          onClick={() => {
            this.onClick(
              this.props._Type.substring(6, this.props._Type.length)
            );
          }}
        >
          {this.props._Description}
        </div>
        <div style={this.props.margin && { marginLeft: 10 }}>
          {this.renderCurrent(this.state.data, 10)}
        </div>
      </React.Fragment>
    );
  }
}

export default Parent;
