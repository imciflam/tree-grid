import React, { Component } from "react";
import storeInterface from "./storeInterface";
import globalStoreObject from "./globalStoreObject";
import TreeNode from "./TreeNode";

export class Tree extends Component<{}, any> implements storeInterface {
  constructor(props: any) {
    super(props);
    this.state = { data: false, globalStore: globalStoreObject };
  }

  fetchEntity = (filename: string) => {
    import(`../${filename}`).then(response => {
      this.setState({ data: response.Entity.Fields });
      const entityName = JSON.stringify(response["Entity"]["_Name"]);
      const entityData = JSON.stringify(response.Entity);
      globalStoreObject.addToGlobalStore(entityName, entityData);
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
                addToGlobalStore={globalStoreObject.addToGlobalStore}
                getFromGlobalStore={globalStoreObject.getFromGlobalStore}
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
                addToGlobalStore={globalStoreObject.addToGlobalStore}
                getFromGlobalStore={globalStoreObject.getFromGlobalStore}
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
    const result = globalStoreObject.getFromGlobalStore("GENERIC_REPORT");
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
