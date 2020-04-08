import React, { Component } from "react";
import storeInterface from "./storeInterface";
import "./styles/App.css";

export class TreeNode extends Component<any, any> implements storeInterface {
  constructor(props: any) {
    super(props);
    this.state = { data: false };
  }

  fetchEntity(filename: string) {
    import(`../${filename}`)
      .then(response => {
        const entityName = JSON.stringify(response.Entity._Name);
        const entityData = JSON.stringify(response.Entity);
        this.props.addToGlobalStore(entityName, entityData);
        this.setState({ data: response.Entity.Fields });
      })
      .catch(error => {
        console.log(error);
        alert("no data for this entity");
      });
  }

  renderCurrent = (data: any, marginData: number) => {
    if (data && marginData) {
      const result = [];
      for (const [, [element, value]] of Object.entries(Object.entries(data))) {
        switch (element) {
          case "Parent":
            if (typeof value === "object") {
              result.push(
                <TreeNode
                  {...value}
                  key={this.props._Index}
                  globalStore={this.props.globalStore}
                  addToGlobalStore={this.props.addToGlobalStore}
                  getFromGlobalStore={this.props.getFromGlobalStore}
                  margin={marginData}
                  componentType="parent"
                />
              );
            }
            break;
          case "Child":
            (value as []).forEach((element: object) => {
              result.push(
                <TreeNode
                  {...element}
                  key={this.props._Index}
                  globalStore={this.props.globalStore}
                  addToGlobalStore={this.props.addToGlobalStore}
                  getFromGlobalStore={this.props.getFromGlobalStore}
                  margin={marginData}
                  componentType="child"
                />
              );
            });
            break;
          case "Attribute":
            (value as []).forEach((element: object) => {
              result.push(
                <TreeNode
                  {...element}
                  key={this.props._Index}
                  margin={marginData}
                  componentType="attribute"
                />
              );
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

  onClick = (name: string) => {
    if (this.props.componentType !== "attribute") {
      if (!this.state.data) {
        const result = this.props.getFromGlobalStore(name);
        if (!result) {
          this.fetchEntity(name);
        } else {
          this.setState({ data: result });
        }
      } else {
        this.setState({ data: false });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          key={this.props._Index}
          className={`${this.props.componentType} 
            ${
              this.state.data
                ? `${this.props.componentType}--open`
                : `${this.props.componentType}--closed`
            }`}
          style={{ marginLeft: this.props.margin }}
          onClick={() => {
            this.onClick(
              this.props._Type.substring(6, this.props._Type.length)
            );
          }}
        >
          {this.props._Description}
        </div>
        {this.state.data && (
          <div style={this.props.margin && { marginLeft: 10 }}>
            {this.renderCurrent(this.state.data, 10)}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TreeNode;
