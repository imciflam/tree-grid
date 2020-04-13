import React, { Component } from "react";
import storeInterface from "../storeInterface";
import TreeNode from "./TreeNode";

export class Tree extends Component<any, any> implements storeInterface {
  constructor(props: any) {
    super(props);
    this.state = { data: false };
  }

  fetchEntity = (filename: string) => {
    import(`../${filename}`).then(response => {
      this.setState({ data: response.Entity.Fields });
      const entityName = JSON.stringify(response["Entity"]["_Name"]);
      const entityData = JSON.stringify(response.Entity);
      this.props.addToGlobalStore(entityName, entityData);
    });
  };

  renderCurrent = (data: any) => {
    if (data) {
      const result = [];
      for (const [, [element, value]] of Object.entries(Object.entries(data))) {
        if (element === "Parent") {
          if (typeof value === "object" && value) {
            result.push(
              <TreeNode
                {...value}
                globalStore={this.state.globalStore}
                addToGlobalStore={this.props.addToGlobalStore}
                getFromGlobalStore={this.props.getFromGlobalStore}
                componentType="parent"
              />
            );
          }
        } else if (element === "Child") {
          (value as []).forEach((element: object) => {
            result.push(
              <TreeNode
                {...element}
                globalStore={this.state.globalStore}
                addToGlobalStore={this.props.addToGlobalStore}
                getFromGlobalStore={this.props.getFromGlobalStore}
                componentType="child"
              />
            );
          });
        } else if (element === "Attribute") {
          (value as []).forEach((element: object) => {
            result.push(<TreeNode {...element} componentType="attribute" />);
          });
        }
      }
      return result;
    }
  };

  public componentDidMount() {
    const result = this.props.getFromGlobalStore("GENERIC_REPORT");
    if (!result) {
      this.fetchEntity("GENERIC_REPORT.json");
    } else {
      this.setState({ data: result });
    }
  }

  render() {
    return (
      <React.Fragment>{this.renderCurrent(this.state.data)}</React.Fragment>
    );
  }
}

export default Tree;
