import React, { Component } from "react";
import storeInterface from "./components/storeInterface";
import globalStoreObject from "./components/globalStoreObject";
import TreeNode from "./components/TreeNode";

export class App extends Component<{}, any> implements storeInterface {
  constructor(props: any) {
    super(props);
    this.state = { data: false, globalStore: globalStoreObject };
  }

  addToGlobalStore = (childName: string, childData: string) => {
    // making a copy and modifying a state object
    const globalStore = { ...this.state.globalStore };
    globalStore[childName] = childData;
    this.setState({ globalStore });
  };

  getFromGlobalStore = (entityName: string) => {
    const stringEntityName = JSON.stringify(entityName);
    const entity = this.state.globalStore[stringEntityName];
    if (!entity) {
      return false;
    } else {
      const parsedData = JSON.parse(entity);
      return parsedData.Fields;
    }
  };

  fetchEntity = (filename: string) => {
    import(`${filename}`).then(response => {
      this.setState({ data: response.Entity.Fields });
      const entityName = JSON.stringify(response["Entity"]["_Name"]);
      const entityData = JSON.stringify(response.Entity);
      this.addToGlobalStore(entityName, entityData);
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
                addToGlobalStore={this.addToGlobalStore}
                getFromGlobalStore={this.getFromGlobalStore}
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
                addToGlobalStore={this.addToGlobalStore}
                getFromGlobalStore={this.getFromGlobalStore}
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
    const result = this.getFromGlobalStore("GENERIC_REPORT");
    if (!result) {
      this.fetchEntity("./GENERIC_REPORT.json");
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

export default App;
